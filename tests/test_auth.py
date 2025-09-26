import unittest
from fastapi.testclient import TestClient
from main import app
from base_test import BaseTest

client = TestClient(app)

class TestAuth(BaseTest):

    def test_register(self):
        #create unique usernames only
        username = f"testuser_{self._testMethodName}"
        response = client.post("/auth/register", json={
            "username": username,
            "password": "testpass"
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["username"], username)

    def test_login_success(self):
        # step 1- register the user
        username = f"loginuser_{self._testMethodName}"
        client.post("/auth/register", json={
            "username": username,
            "password": "1234"
        })
        #step 2-login
        response = client.post("/auth/login", json={
            "username": username,
            "password": "1234"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "Login successful")

    def test_login_fail(self):
        response = client.post("/auth/login", json={
            "username": "nonexistentuser",
            "password": "wrongpass"
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["detail"], "Invalid credentials")

if __name__ == "__main__":
    BaseTest.main()  

import unittest
from base_test import BaseTest
from fastapi.testclient import TestClient
from main import app


client = TestClient(app)

class TestSweets(BaseTest):
    def test_create_sweet(self):
        response = client.post("/sweets/", json={"name": "Chocolate", "flavor": "Sweet"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "Chocolate")

    def test_read_sweet(self):
        create = client.post("/sweets/", json={"name": "Candy", "flavor": "Fruity"})
        sweet_id = create.json()["id"]
        response = client.get(f"/sweets/{sweet_id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "Candy")

    def test_update_sweet(self):
        create = client.post("/sweets/", json={"name": "Lollipop", "flavor": "Cherry"})
        sweet_id = create.json()["id"]
        response = client.put(f"/sweets/{sweet_id}", json={"name": "Lollipop", "flavor": "Strawberry"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["flavor"], "Strawberry")

    def test_delete_sweet(self):
        create = client.post("/sweets/", json={"name": "Marshmallow", "flavor": "Vanilla"})
        sweet_id = create.json()["id"]
        response = client.delete(f"/sweets/{sweet_id}")
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())

if __name__ == "__main__":
    unittest.main()

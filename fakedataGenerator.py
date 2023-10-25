import random
import json
from faker import Faker

# Create a Faker instance to generate random data
fake = Faker()

# List to store JSON objects
json_objects = []

# Generate unique IDs in the range from 1 to 50
unique_ids = set()

while len(unique_ids) < 50:
    unique_id = random.randint(1, 50)
    if unique_id not in unique_ids:
        unique_ids.add(unique_id)

# Generate 50 JSON objects with unique IDs
for id in unique_ids:
    json_obj = {
        "id": id,
        "gender": random.choice(["Male", "Female"]),
        "name": fake.name(),
        "contact": fake.phone_number(),
        "address": fake.address(),
        "photoUrl": fake.image_url()
    }
    json_objects.append(json_obj)

# Convert the list of JSON objects to a JSON array
json_data = json.dumps(json_objects, indent=2)

# Save the JSON data to a file
with open('data.json', 'w') as json_file:
    json_file.write(json_data)

print("JSON data with unique IDs has been saved to 'data.json'.")

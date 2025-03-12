import requests
import os

# Define the base URL
base_url = "https://celeste.q13x.com"

# Input and output file paths
input_file = "404s.txt"
output_dir = "downloads"

# Create a directory to save downloads if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Function to download a file
def download_file(url, save_path):
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(save_path, 'wb') as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            print(f"Downloaded: {url}")
        else:
            print(f"Failed to download {url} (Status code: {response.status_code})")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Read the input file and process each line
with open(input_file, 'r') as file:
    for line in file:
        if "GET" in line and "404" in line:
            # Extract the path from the log line
            parts = line.split('"')
            if len(parts) > 1:
                path = parts[1].split(" ")[1]  # Extract the path from the GET request
                # Construct the full URL
                full_url = f"{base_url}{path}"
                # Define the save path for the downloaded file
                filename = os.path.basename(path)
                save_path = os.path.join(output_dir, filename)
                # Download the file
                download_file(full_url, save_path)

import os
import requests

# Base URL
assetsURI = "https://celeste.q13x.com/framework/data/"

# List of files to download
files = [
    "dataaa.data", "dataab.data", "dataac.data", "dataad.data", "dataae.data",
    "dataaf.data", "dataag.data", "dataah.data", "dataai.data", "dataaj.data",
    "dataak.data", "dataal.data", "dataam.data", "dataan.data", "dataao.data",
    "dataap.data", "dataaq.data", "dataar.data", "dataas.data", "dataat.data",
    "dataau.data", "dataav.data", "dataaw.data", "dataax.data", "dataay.data"
]

# Directory to save downloaded files
output_dir = "framework/data"
os.makedirs(output_dir, exist_ok=True)

# Download files
for file_name in files:
    url = f"{assetsURI}{file_name}"
    output_path = os.path.join(output_dir, file_name)
    
    try:
        print(f"Downloading {url}...")
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx and 5xx)
        
        with open(output_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):  # Download in chunks
                file.write(chunk)
        
        print(f"Saved to {output_path}")
    except requests.RequestException as e:
        print(f"Failed to download {url}: {e}")

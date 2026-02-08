import gdown
import os
import zipfile

FILE_ID = "1XEUDUa9jVjelvwFeLZ8kGR9Su4V9Wlqb"
ZIP_PATH = "model.zip"
EXTRACT_PATH = "scam_detector_model"

url = f"https://drive.google.com/uc?id={FILE_ID}"

if not os.path.exists(EXTRACT_PATH):
    print("Downloading model zip...")
    gdown.download(url, ZIP_PATH, quiet=False)

    print("Extracting model...")
    with zipfile.ZipFile(ZIP_PATH, 'r') as zip_ref:
        zip_ref.extractall(".")

    os.remove(ZIP_PATH)
    print("Model ready!")
else:
    print("Model already exists.")

import subprocess


def main():
    print("Pre-processing data...")
    #subprocess.run(['python', 'scripts/preprocess.py'])

    print("Training the model...")
    #subprocess.run(['python', 'scripts/train.py'])

    print("Evaluating the model...")
    subprocess.run(['python', 'scripts/evaluate.py'])

    print("Prediction for a new application...")
    # subprocess.run(['python', 'scripts/predict.py'])

    print("Test...")
    subprocess.run(['python', 'test.py'])


if __name__ == "__main__":
    main()

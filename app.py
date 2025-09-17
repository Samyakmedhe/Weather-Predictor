from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])  # Allow Angular frontend

# Load model and scaler
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

# Features expected by the model
feature_columns = ["maxtempC", "mintempC", "humidity", "pressure",
                   "windspeedKmph", "cloudcover", "sunHour", "DewPointC"]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print("Received JSON:", data)

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        # Ensure all required columns exist
        for col in feature_columns:
            if col not in input_df.columns:
                input_df[col] = 0  # fill missing with 0

        input_df = input_df[feature_columns]  # reorder columns

        # Scale input
        input_scaled = scaler.transform(input_df)
        print("Scaled input:", input_scaled)

        # Make prediction
        prediction = model.predict(input_scaled)[0]
        print("Raw model prediction:", prediction)

        prediction_text = "Rainy" if prediction == 1 else "Sunny"
        print("Prediction result:", prediction_text)

        return jsonify({"prediction": prediction_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

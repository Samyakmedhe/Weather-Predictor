import { Component } from '@angular/core';
import { PredictionService } from '../prediction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent {
  weatherData: { [key: string]: string } = {
    maxtempC: '', mintempC: '', humidity: '',
    pressure: '', windspeedKmph: '', cloudcover: '', sunHour: '', DewPointC: ''
  };

  weatherKeys: string[] = Object.keys(this.weatherData);

  constructor(private predictionService: PredictionService, private router: Router) {}

  submitForm() {
    // Convert all inputs to numbers
    const numericData: { [key: string]: number } = {};
    for (let key of this.weatherKeys) {
      numericData[key] = Number(this.weatherData[key]) || 0;
    }

    console.log("Sending numeric data:", numericData);

    this.predictionService.predictWeather(numericData).subscribe(
      (response) => {
        console.log("Prediction received:", response);
        localStorage.setItem('prediction', response.prediction);
        this.router.navigate(['/result']);
      },
      (error) => console.error("API Error:", error)
    );
  }
}

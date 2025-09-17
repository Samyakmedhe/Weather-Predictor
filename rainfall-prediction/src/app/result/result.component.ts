import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  prediction: string = '';

  ngOnInit() {
    const storedPrediction = localStorage.getItem('prediction');
    this.prediction = storedPrediction ? storedPrediction : 'Unknown';
    console.log("Prediction displayed:", this.prediction);
  }
  

  getWeatherImage(): string {
    return this.prediction === 'Rainy' ? 'assets/image.png' : 'assets/image copy.png';
  }

  constructor(private router: Router) {} // Inject Router

  goBack() {
    this.router.navigate(['/']); // Navigate back to home
  }
}

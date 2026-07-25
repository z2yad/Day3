import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { inject } from '@angular/core';
import { Weather } from '../../services/weather';
import { WeatherResponse } from '../../inerfaces/weather';

Chart.register(...registerables);

@Component({
  selector: 'app-dashbord',
  imports: [NgClass],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord implements AfterViewInit, OnInit {
  @ViewChild('summaryChart') summaryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('radarChart') radarChartRef!: ElementRef<HTMLCanvasElement>;


  summaryChart!: Chart;
  radarChart!: Chart;
  Weatherservice = inject(Weather);
  weather!: WeatherResponse;
  //variable for current  weather
  temperature: number = 0;
  humidity: number = 0;
  windspeed: number = 0;
  rain: number = 0;
  time: string = '2026/01/01';
  //variables for daily weather
  temperatureMax: number[] = [];
  temperatureMin: number[] = [];

  rainSum: number[] = [];
  windSpeed10mMax: number[] = [];
  dailyTime: string[] = [];
  //create variables for diff and percent of weather metrics
  tempDiff: number = 0;
  tempPrecent: string = '0%';

  tempMinDiff: number = 0;
  tempMinPrecent: string = '0%';

  rainSumDiff: number = 0;
  rainSumPrecent: string = '0%';

  windSpeedDiff: number = 0;
  windSpeedPrecent: string = '0%';

  ngOnInit(): void {
    this.Weatherservice.getWeather().subscribe({
      next: (res) => {
        //current weather
        this.weather = res;
        this.temperature = res.current.temperature_2m;
        this.humidity = res.current.relative_humidity_2m;
        this.windspeed = res.current.wind_speed_10m;
        this.rain = res.current.rain;
        this.time = res.current.time;
        //daily weather
        this.temperatureMax = res.daily.temperature_2m_max;
        this.temperatureMin = res.daily.temperature_2m_min;
        this.rainSum = res.daily.rain_sum;
        this.windSpeed10mMax = res.daily.wind_speed_10m_max;
        this.dailyTime = res.daily.time;

        // 1. Temperature Max Diff & Percent
        if (this.temperatureMax.length >= 2) {
          const day1 = this.temperatureMax[0];
          const day2 = this.temperatureMax[1];
          this.tempDiff = Number((day2 - day1).toFixed(1));
          this.tempPrecent = (day1 !== 0 ? ((this.tempDiff / day1) * 100).toFixed(2) : '0') + '%';
        }

        // 2. Temperature Min Diff & Percent
        if (this.temperatureMin.length >= 2) {
          const day1 = this.temperatureMin[0];
          const day2 = this.temperatureMin[1];
          this.tempMinDiff = Number((day2 - day1).toFixed(1));
          this.tempMinPrecent = (day1 !== 0 ? ((this.tempMinDiff / day1) * 100).toFixed(2) : '0') + '%';
        }

        // 3. Rain Sum Diff & Percent
        if (this.rainSum.length >= 2) {
          const day1 = this.rainSum[0];
          const day2 = this.rainSum[1];
          this.rainSumDiff = Number((day2 - day1).toFixed(1));
          this.rainSumPrecent = (day1 !== 0 ? ((this.rainSumDiff / day1) * 100).toFixed(2) : '0') + '%';
        }

        // 4. Wind Speed Max Diff & Percent
        if (this.windSpeed10mMax.length >= 2) {
          const day1 = this.windSpeed10mMax[0];
          const day2 = this.windSpeed10mMax[1];
          this.windSpeedDiff = Number((day2 - day1).toFixed(1));
          this.windSpeedPrecent = (day1 !== 0 ? ((this.windSpeedDiff / day1) * 100).toFixed(2) : '0') + '%';
        
      }
      console.log(res)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngAfterViewInit(): void {
    this.initSummaryChart();
    this.initRadarChart();
  }

  private initSummaryChart(): void {
    if (!this.summaryChartRef) return;
    const ctx = this.summaryChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.summaryChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dailyTime,
        datasets: [
          {
            label: 'Inpatient',
            data: this.temperatureMax,
            backgroundColor: '#10b981',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: 'Emergency',
            data: this.temperatureMin,
            backgroundColor: '#f59e0b',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: 'Discharged',
            data: this.windSpeed10mMax,
            backgroundColor: '#f87171',
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#4b5563',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: (context: any) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y * 10;
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
              },
            },
          },
          y: {
            min: 10,
            max: 30,
            grid: {
              color: '#f3f4f6',
            },
            ticks: {
              color: '#6b7280',
              stepSize: 5,
              callback: (value: any) => '$' + value + 'K',
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });
  }

  private initRadarChart(): void {


    if (!this.radarChartRef) return;
    const ctx = this.radarChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Diabetes',
          'Asthma',
          'Epilepsy',
          'Cancer',
          'Allergies',
          'Heart Disease',
          'Depression',
          'Hypertension',
        ],
        datasets: [
          {
            label: 'Diagnosis Count',
            data: [75, 60, 70, 50, 65, 80, 55, 70],
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10b981',
            borderWidth: 2,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            angleLines: {
              color: '#e5e7eb',
            },
            grid: {
              color: '#f3f4f6',
            },
            pointLabels: {
              color: '#374151',
              font: {
                size: 11,
                weight: 500,
              },
            },
            ticks: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });
  }

}

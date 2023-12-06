import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService){

  }
  
  factResult: string;
  lat: string;
  long: string;
  date: string;
  isValid: boolean;
  errorMessage: string;
  sunResult: string;

  ngOnInit(): void {
    this.loadFact();
    this.loadLatLong();
  }

  private loadFact() {
    
    this.dashboardService.GetFact().subscribe({
      next: (res: any) => {
        this.factResult = res.fact.toString();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    
  }

  ngRefreshCatFact() {
    this.loadFact();
  }

  loadLatLong() {
    if (typeof localStorage !== 'undefined'){
      if(localStorage.getItem('sunData') != undefined){
        let result = JSON.parse(localStorage.getItem('sunData') || '');
        this.lat = result.lat;
        this.long = result.long;
        this.date = result.date;
        this.sunResult = result.result;
      }
    }
  }

  saveLocalLatLongData(resultData: string): void{
    let objectResult = {
      lat:this.lat,
      long: this.long,
      date: this.date,
      result: resultData
    }
    localStorage.setItem('sunData',JSON.stringify(objectResult));
  }

  getSunInformation() {
    
    this.isValid = true;
    this.sunResult = '';
    this.errorMessage = 'Please enter following fields/field ';
    if (this.lat == undefined || this.lat == "") {
      this.errorMessage += " - Latitude "
      this.isValid = false;
    } 
    if (this.long == undefined || this.long == "") {
      this.isValid = false;
      this.errorMessage += " - Longitude "
    } 
    if (this.date == undefined || this.date == "") {
      this.isValid = false;
      this.errorMessage += " - Date "
    } 
    
    if(this.isValid) {
      let param = "json?lat=" + this.lat + "&lng=" + this.long + "&date=" + this.date;
      this.dashboardService.GetSunInformation(param).subscribe({
        next: (res: any) => {
          this.sunResult = "Date: " + this.date + " Sunrise Time: " + res.results.sunrise + " Sunset Time: " + res.results.sunset;
          this.saveLocalLatLongData(this.sunResult);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
    else {
      this.saveLocalLatLongData('');
    }
  }

}

import { Component } from '@angular/core';
import { TripAdvisorService } from '../services/trip-advisor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  attivita!: any[];

  constructor(private service: TripAdvisorService, private route: Router) { }

  ngOnInit() {
    this.service.getAllAttivita().subscribe({
    next: (res: any) => {
      this.attivita = res;
      console.log(this.attivita);
    }
  });
  }

  vediDettaglio(attivita:any){
    this.route.navigate(['/recensioni', attivita.id])
  }

}

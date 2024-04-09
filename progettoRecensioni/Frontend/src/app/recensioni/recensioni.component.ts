import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripAdvisorService } from '../services/trip-advisor.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogAnimationsComponent } from '../dialog-animations/dialog-animations.component';

declare var $: any;

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.css']
})
export class RecensioniComponent implements OnInit {

  recensioni: any[] = [];
  attivitaId!: number;
  selectedRecensione: any;

  constructor(private route: ActivatedRoute, private service: TripAdvisorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.attivitaId = params['id'];
      console.log(this.attivitaId);
      this.mostraTutteLeRecensioni();
    });
  }

  mostraTutteLeRecensioni() {
    this.service.mostraRecensioni(this.attivitaId).subscribe(
      (res: any) => {
        this.recensioni = res;
        console.log(this.recensioni);
      }
    )
  }

  aggiungiUtente(nome: string, stella: string, data: string, testo: string) {

    const nuovaRecensione = { nome, stella: parseFloat(stella), data: new Date(data), testo, attivita:{id:this.attivitaId} };
    this.service.aggiungiRecensione(nuovaRecensione).subscribe(
      (res: any) => {
        this.recensioni.push(nuovaRecensione);
        this.mostraTutteLeRecensioni();
      }
    );
  }

  eliminaRecensione(id: number) {

        this.service.cancellaRecensione(id).subscribe(
        (res: any) => {
            const indice = this.recensioni.findIndex(x => x.id === id);
            this.recensioni.splice(indice, 1);
            this.mostraTutteLeRecensioni();
          }
        );

      }



  modificaRecensione(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }







}






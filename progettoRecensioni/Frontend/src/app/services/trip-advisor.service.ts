import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripAdvisorService {


  constructor(private http: HttpClient) { }

  getAllAttivita() {
    return this.http.get('http://localhost:8096/api/attivita/mostraTutteLeAttivita');
  }
  getRecensioniPerAttivitaId(id:any) {
    return this.http.get(`http://localhost:8096/api/recensione/trovaRecensioniPerAttivita/${id}`);
  }
  aggiuntaAttivita(attivita:any) {
    return this.http.post('http://localhost:8096/api/attivita/creaAttivita', attivita);
  }
  aggiungiRecensione(attivita:any) {
    return this.http.post('http://localhost:8096/api/recensione/creaRecensione', attivita);
  }
  cancellaRecensione(id: number) {
    return this.http.delete(`http://localhost:8096/api/recensione/eliminaRecensionePerId/${id}`);
  }
  mostraRecensioni(id: number) {
    return this.http.get(`http://localhost:8096/api/recensione/mostraRecensionePerAttivitaId/${id}`);
  }
  modificaRecensione(id: number, recensione: any) {

    return this.http.put(`http://localhost:8096/api/recensione/modificaPerId/${id}`, recensione);
  }

}

import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor( private categotyService: EntryService) { }

  ngOnInit() {
    this.categotyService.getAll().subscribe(
      entries => this.entries =  entries.sort((a,b) => b.id ),
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry) {
    const mustDelete = confirm('Deseja realmente excluir este item?')
    if(mustDelete) {
      this.categotyService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        () => alert('Erro ao tentar excluir!')
      );
    }
  }

}

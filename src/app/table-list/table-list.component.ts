// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-table-list',
//   templateUrl: './table-list.component.html',
//   styleUrls: ['./table-list.component.css']
// })
// export class TableListComponent implements OnInit {

//   filasAMostrar = 5;

//   filtrarTabla(event: any) {
//     const input = event.target;
//     const filter = input.value.toUpperCase();
//     const table = document.getElementById('tabla-ninos');
//     const rows = table.getElementsByTagName('tr');

//     for (let i = 0; i < rows.length; i++) {
//       const td = rows[i].getElementsByTagName('td')[1];
//       if (td) {
//         const txtValue = td.textContent || td.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           rows[i].style.display = '';
//         } else {
//           rows[i].style.display = 'none';
//         }
//       }
//     }
//     this.ajustarFilas
//   }

//   ajustarFilas() {
//     const table = document.getElementById('tabla-ninos');
//     const rows = table.getElementsByTagName('tr');


//     for (let i = 0; i < this.filasAMostrar; i++) {
//       if (rows[i]) {
//         rows[i].style.display = '';
//       }
//     }

//     for (let i = this.filasAMostrar; i < rows.length; i++) {
//       rows[i].style.display = 'none';
//     }
//   }
//   constructor(private router: Router) { }
//   redirigir() {
//     // Aquí colocas la ruta a la que quieres redirigir
//     this.router.navigate(['/crear-niños']);
//   }
//   ngOnInit() {

//     this.ajustarFilas();
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  filasAMostrar = 5;

  constructor(private router: Router) { }

  filtrarTabla(event: any) {
    const input = event.target;
    const filter = input.value.toUpperCase();
    const table = document.getElementById('tabla-ninos');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      const td = rows[i].getElementsByTagName('td')[1];
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    }
    this.ajustarFilas(); // Faltaba los paréntesis aquí
  }

  ajustarFilas() {
    const table = document.getElementById('tabla-ninos');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < this.filasAMostrar; i++) {
      if (rows[i]) {
        rows[i].style.display = '';
      }
    }

    for (let i = this.filasAMostrar; i < rows.length; i++) {
      rows[i].style.display = 'none';
    }
  }

  redirigir() {

    this.router.navigate(['/crear-niños']);
  }

  ngOnInit() {
    this.ajustarFilas();
  }
}
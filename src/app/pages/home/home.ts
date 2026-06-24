import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  productos: any[] = [];
  errorMessage = '';
  loading = true;


  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    console.log("HOME INICIADO");

    this.cargarProductos();

  }



  cargarProductos(): void {


    console.log("CONSULTANDO PRODUCTOS");


    this.productService.getProducts()
    .subscribe({

      next: (response:any) => {


        console.log("RESPUESTA API:", response);



        if(Array.isArray(response)){


          setTimeout(()=>{


            this.productos = [...response];

            this.loading = false;

            this.cd.detectChanges();


            console.log(
              "PRODUCTOS MOSTRADOS:",
              this.productos.length
            );


          },100);


        }
        else {

          this.productos = [];

          this.loading = false;

        }


      },


      error:(error)=>{


        console.error(
          "ERROR API:",
          error
        );


        this.errorMessage =
        "No se pudieron cargar los productos";


        this.loading = false;


      }


    });


  }



  trackProducto(index:number, producto:any){

    return producto._id;

  }



  agregarAlCarrito(producto:any){

    console.log(
      "Producto:",
      producto
    );

  }

}
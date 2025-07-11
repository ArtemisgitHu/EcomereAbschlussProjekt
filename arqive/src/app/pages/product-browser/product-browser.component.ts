import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-browser',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './product-browser.component.html',
  styleUrls: ['./product-browser.component.scss'],
})
export class ProductBrowserComponent implements OnInit {
  // Arrays für die verschiedenen Produktkategorien
  handtaschenProducts: Product[] = [];
  schmuckProducts: Product[] = [];

  // Filter-Zustand (nur für UI, keine Funktionalität)
  minPrice: number = 0;
  maxPrice: number = 10000;
  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  selectedTypes: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Produkte beim Initialisieren der Komponente laden
    this.loadProducts();
  }

  // Methode zum Laden der Produkte mit dem Service
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        // Produkte nach Kategorie filtern
        this.handtaschenProducts = products.filter(
          (p) => p.category === 'handtaschen'
        );
        this.schmuckProducts = products.filter((p) => p.category === 'schmuck');
      },
      error: (error) => {
        console.error('Fehler beim Laden der Produkte:', error);
        // Im Fehlerfall leere Arrays behalten, damit die Platzhalter angezeigt werden
        this.handtaschenProducts = [];
        this.schmuckProducts = [];
      },
    });
  }

  // Handler für Typ-Änderungen
  handleTypeChange(event: any, type: string): void {
    if (event.target.checked) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
    this.applyFilters();
  }

  // Handler für Farb-Änderungen
  handleColorChange(event: any, color: string): void {
    if (event.target.checked) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter((c) => c !== color);
    }
    this.applyFilters();
  }

  // Handler für Größen-Änderungen
  handleSizeChange(event: any, size: string): void {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter((s) => s !== size);
    }
    this.applyFilters();
  }

  // Leere Methoden für UI-Elemente, die keine Funktionalität haben sollen
  applyFilters(): void {
    // Diese Methode tut nichts mehr, da wir keine Filter im Backend verwenden
    console.log('Filter UI wurde verwendet, aber hat keine Funktionalität');
    // Wir laden einfach alle Produkte
    this.loadProducts();
  }

  // Methode zum Aktualisieren der Preisfilter (für die Range-Inputs)
  updatePriceFilter(min: number, max: number): void {
    this.minPrice = min;
    this.maxPrice = max;
    // Keine Filter-Anwendung mehr
    console.log(
      'Preis-Filter UI wurde verwendet, aber hat keine Funktionalität'
    );
  }
}

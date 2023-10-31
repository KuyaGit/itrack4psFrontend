import { Injectable } from '@angular/core';
import { barangayNames } from './data';
@Injectable({
  providedIn: 'root'
})
export class BarangaysService {
  private barangaylist : barangayNames [] = [
    { barangay: 'Anilao East' },
    { barangay: 'Anilao Proper' },
    { barangay: 'Bagalangit' },
    { barangay: 'Bulacan' },
    { barangay: 'Calamias' },
    { barangay: 'Estrella' },
    { barangay: 'Gasang' },
    { barangay: 'Laurel' },
    { barangay: 'Ligaya' },
    { barangay: 'Mainaga' },
    { barangay: 'Mainit' },
    { barangay: 'Majuben' },
    { barangay: 'Malimatoc I' },
    { barangay: 'Malimatoc II' },
    { barangay: 'Nag-Iba' },
    { barangay: 'Pilahan' },
    { barangay: 'Poblacion' },
    { barangay: 'Pulang Lupa' },
    { barangay: 'Pulong Anahao' },
    { barangay: 'Pulong Balibaguhan' },
    { barangay: 'Pulong Niogan' },
    { barangay: 'Saguing' },
    { barangay: 'Sampaguita' },
    { barangay: 'San Francisco' },
    { barangay: 'San Jose' },
    { barangay: 'San Juan' },
    { barangay: 'San Teodoro' },
    { barangay: 'Sta. Ana' },
    { barangay: 'Sta. Mesa' },
    { barangay: 'Sto. Nino' },
    { barangay: 'Sto. Tomas' },
    { barangay: 'Solo' },
    { barangay: 'Talaga East' },
    { barangay: 'Talaga Proper' },
  ];

  getAllBarangayNames(){
    return this.barangaylist;
  }
  constructor() { }
}

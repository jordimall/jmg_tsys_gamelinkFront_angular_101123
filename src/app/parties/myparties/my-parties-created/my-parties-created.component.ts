import { Component, OnInit } from '@angular/core';
import { Party } from '../../../models/party.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { PartyService } from '../../../services/party.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-my-parties-created',
  standalone: true,
  imports: [NavBarComponent, RouterLink],
  templateUrl: './my-parties-created.component.html',
  styleUrl: './my-parties-created.component.css'
})
export class MyPartiesCreatedComponent implements OnInit{

  parties: Party[] = [];

  constructor(private partyService: PartyService, private tokenService: TokenStorageService, private route: Router){
    
  }

  ngOnInit(){
    this.getAllOwnedParties();

    //Apply the styles
    (<HTMLElement> document.getElementById('my_parties_nav_created')).classList.remove("my_parties_nav_no_selected");
    (<HTMLElement> document.getElementById('my_parties_nav_joined')).classList.add("my_parties_nav_no_selected");
  }

  onEditClick = (e: Event, id: number | undefined): void => {
    this.route.navigateByUrl('edit-party/'+id);
  }

  onDeleteClick = (e: Event, id: number | undefined): void => {
    this.partyService.deleteOwnParty(id as number).subscribe(
      result => {
        this.getAllOwnedParties();
      },
      error => {
        this.route.navigateByUrl("/404");
      }
    );
  }

  getAllOwnedParties = (): void => {
    this.partyService.getOwnParties().subscribe(
      result => {
        this.parties = result.content;
        console.log(this.parties)
      },
      error => {
        this.route.navigateByUrl("/404");
      }
    );
  }
}

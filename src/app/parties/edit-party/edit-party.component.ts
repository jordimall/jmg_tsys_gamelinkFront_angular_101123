import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { Router, RouterLink } from '@angular/router';
import { GameRole } from '../../models/game-role.model';
import { GameRoleService } from '../../services/game-role.service';
import { Party } from '../../models/party.model';
import { UserPartyGameRole } from '../../models/user-party-game-role.model';
import { PartyService } from '../../services/party.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-edit-party',
  standalone: true,
  imports: [NavBarComponent, RouterLink],
  templateUrl: './edit-party.component.html',
  styleUrl: './edit-party.component.css'
})
export class EditPartyComponent implements OnInit{

  gameRoles: GameRole[] = [];
  gameRolesInputElements: GameRole[] = [];
  party: Party = new Party;
  partyId: number = 0;

  constructor(private gameRoleService: GameRoleService, private partyService: PartyService, private route: Router){

  }

  ngOnInit() {
    let url: string[] = this.route.url.split("/");
    this.partyId = url[url.length - 1] as unknown as number;
    this.partyService.getOnePartyById(this.partyId).subscribe(
      result => {
        this.party = result;
        console.log(result);

        let gameId: number | undefined = this.party.game?.id;

        this.gameRoleService.getAllGameRoleByGame(gameId).subscribe(
          result => {
            this.gameRoles = result.content;
            console.log(result.content)
          },
          error => {
            this.route.navigateByUrl("/404");
          }
        );
      },
      error => {

      }
    );
    


  }

  //Add or remove a role in the array gameRolesInputElements, that enables to
  //add or remove input elements in the form by a @for in the view
  onRoleClick = (e: Event, role: GameRole): void => {
    let element;

    if((<HTMLElement>e.target).classList.contains('create_party_role_img_selected')){
      (<HTMLElement>e.target).classList.remove('create_party_role_img_selected');
      element = document.getElementById("create_party_role_"+role.id);
      let index = 0;
      let found = false;

      while(!found){
        if (this.gameRolesInputElements[index].id == role.id) {
          found = true
        } else {
          index+=1;
        }
      }

      this.gameRolesInputElements.splice(index, 1);

    } else {
      (<HTMLElement>e.target).classList.add('create_party_role_img_selected');
      element = document.createElement('div');
      this.gameRolesInputElements.push(role);
      
    }

  }
  
  //Recover the values from the form, creates a new party object and send it to the backEnd
  onCreateClick = (e: Event): void => {
    let party: Party = new Party;
    let partyName: string = (<HTMLInputElement> document.getElementById('create_party_name')).value;
    let partyDescription: string = (<HTMLInputElement> document.getElementById('create_party_description')).value;
    let rolesQuantities = (<HTMLCollection>document.getElementsByClassName('create_party_role_quantity'));
    let totalRoleCount: number = 0;
    let game: Game = new Game;
    let rolesDemanded: UserPartyGameRole[] = [];

    if(this.validator(partyName, partyDescription, rolesQuantities)){

      party.name = partyName;
      party.description = partyDescription;
      party.userPartyGameRoles = [];
      game.id = 1;
      party.game = game;

      /*For every input value for game role read the quantity and generates a new UserPartyGameRole
        based on the quantity and add them to the party's userPartyGameRoles attribute*/
      for(let i = 0; i < this.gameRolesInputElements.length; i++){
        totalRoleCount += +(<HTMLInputElement>rolesQuantities[i]).value;
        for(let j = 0; j < +(<HTMLInputElement>rolesQuantities[i]).value; j++){
          let userPartyGameRole: UserPartyGameRole = new UserPartyGameRole;
          userPartyGameRole.gameRole = this.gameRolesInputElements[i];
          party.userPartyGameRoles.push(userPartyGameRole);
        }
      }
      
      //Assign the party's max players based on the ammount of roles and quantities introduced
      party.maxPlayers = totalRoleCount;

      this.partyService.createParty(party).subscribe(
        result => {
          this.route.navigateByUrl('party-details/'+result.id);          
        },
        error => {

        }
      );
      console.log(party)
    }


    
  }

  //Validate the values recovered from the form
  validator = (partyName: string, partyDescription: string, rolesQuantities: any): boolean => {
    let validValues: boolean = true;
    if(partyName == ""){
      validValues = false;
      (<HTMLInputElement> document.getElementById('create_party_name_err')).hidden = false;
    } else {
      (<HTMLInputElement> document.getElementById('create_party_name_err')).hidden = true;
    }

    if(partyDescription == ""){
      validValues = false;
      (<HTMLInputElement> document.getElementById('create_party_description_err')).hidden = false;
    } else {
      (<HTMLInputElement> document.getElementById('create_party_description_err')).hidden = true;
    }

    if(rolesQuantities.length == 0){
      validValues = false;
      (<HTMLInputElement> document.getElementById('create_party_role_err')).hidden = false;
    } else {
      (<HTMLInputElement> document.getElementById('create_party_role_err')).hidden = true;
    }
    return validValues;
  }
}

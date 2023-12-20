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
  gameRolesQuantities: number[] = [];
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
        (<HTMLInputElement> document.getElementById('update_party_name')).value = this.party.name as string;
        (<HTMLInputElement> document.getElementById('update_party_description')).value = this.party.description as string;

        let gameId: number | undefined = this.party.game?.id;

        this.gameRoleService.getAllGameRoleByGame(gameId).subscribe(
          result => {
            this.gameRoles = result.content;
            console.log(result.content)

            this.loadInUserPartyGameRoles(this.party);
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

    if((<HTMLElement>e.target).classList.contains('update_party_role_img_selected')){
      (<HTMLElement>e.target).classList.remove('update_party_role_img_selected');
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
      this.gameRolesQuantities.splice(index, 1);

    } else {
      (<HTMLElement>e.target).classList.add('update_party_role_img_selected');
      this.gameRolesInputElements.push(role);
      this.gameRolesQuantities.push(1);
      
    }

  }
  
  //Recover the values from the form, updates a new party object and send it to the backEnd
  onUpdateClick = (e: Event): void => {
    let party: Party = new Party;
    party.id = this.party.id;
    let partyName: string = (<HTMLInputElement> document.getElementById('update_party_name')).value;
    let partyDescription: string = (<HTMLInputElement> document.getElementById('update_party_description')).value;
    let rolesQuantities = (<HTMLCollection>document.getElementsByClassName('update_party_role_quantity'));
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
      this.partyService.updateOwnParty(party).subscribe(
        result => {
          console.log(result)
          this.route.navigateByUrl('party-details/'+result.id);          
        },
        error => {

        }
      );
    }


    
  }

  //Validate the values recovered from the form
  validator = (partyName: string, partyDescription: string, rolesQuantities: any): boolean => {
    let validValues: boolean = true;
    let validRoles: boolean = true;

    if(partyName == ""){
      validValues = false;
      (<HTMLInputElement> document.getElementById('update_party_name_err')).hidden = false;
    } else {
      (<HTMLInputElement> document.getElementById('update_party_name_err')).hidden = true;
    }

    if(partyDescription == ""){
      validValues = false;
      (<HTMLInputElement> document.getElementById('update_party_description_err')).hidden = false;
    } else {
      (<HTMLInputElement> document.getElementById('update_party_description_err')).hidden = true;
    }

    if(rolesQuantities.length == 0){
      validValues = false;
      (<HTMLInputElement> document.getElementById('update_party_role_err')).hidden = false;
    } else {

      for(let i = 0; i < rolesQuantities.length; i++){
        if((<HTMLInputElement>rolesQuantities[i]).value as unknown as number < 1){
          validRoles = false;
          (<HTMLInputElement> document.getElementById('update_party_role_err')).hidden = false;
        }
      }
      
      if (validRoles){
        (<HTMLInputElement> document.getElementById('update_party_role_err')).hidden = true;
      }
    }
    return validValues;
  }

  loadInUserPartyGameRoles = (party: Party) : void => {
    let upgr: UserPartyGameRole[] | undefined = party.userPartyGameRoles;
    let roleFound: boolean = false;
    let j = 0;
    //Execute after 1ms so de elements are loaded and can be selected
    setTimeout(() => {
      if(upgr != undefined){
        for(let i = 0; i < upgr.length; i++){
          //Mark role icon as selected
          (<HTMLElement> document.getElementById("role_icon_"+upgr[i].gameRole?.id)).classList.add('update_party_role_img_selected');

          //Reset while variables
          j = 0;
          roleFound = false;

          //Look if the game role has already a form element
          while(!roleFound && j < this.gameRolesInputElements.length){
            if(upgr[i].gameRole?.id == this.gameRolesInputElements[j].id){
              roleFound = true;
            } else {
              j++;
            }
          }

          //If the role has a form element increase the saved quanity
          if(roleFound){
            this.gameRolesQuantities[j]++;
          } else {
            //Otherwise add an element and initialize its quantity
            this.gameRolesInputElements.push(upgr[i].gameRole as GameRole);
            this.gameRolesQuantities[j] = 1;
          }
        }
      }
    }, 1);
  }
}

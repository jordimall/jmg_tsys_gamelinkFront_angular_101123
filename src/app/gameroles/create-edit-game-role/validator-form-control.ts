import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Game } from '../../models/game.model';

const arrayNotEmpty = (control: FormControl): any => {
  if (control.value && control.value.length == 0) {
    return { arrayNotEmpty: true };
  }
  return null;
};

const arrayNotEmpty2 = (array:Game[]): ValidatorFn  => {
  // if (array.length === 0) {
  //   return  true ;
  // }
  // return null;
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = array.length === 0;
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
};

export default arrayNotEmpty2;

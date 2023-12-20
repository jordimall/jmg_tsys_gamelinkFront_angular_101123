import { FormControl } from '@angular/forms';

const arrayNotEmpty = (control: FormControl): any => {
  if (control.value && control.value.length == 0) {
    return { arrayNotEmpty: true };
  }
  return null;
};

export default arrayNotEmpty;

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { UsersService } from '../../services/users.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  message: string = '';
  numPage: number | any = 0;
  totalPage: number = 0;
  actualPage: number = 0;
  size: number = 7;
  first: boolean = true;
  last: boolean = true;
  arrayNumber: number[] = [];

  users:any = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService, private messageService: MessageService){}

  ngOnInit(){
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') === null) {
        this.numPage = Number.parseInt(params.get('page') ?? '1') - 1 ?? 0;
      }
    });

    this.getAll();
  }

  getAll(){
    this.message = this.messageService.getMessage();
    this.userService.getAllUsersPaginate(this.numPage, this.size).subscribe(
      (data: any) => {
        const { totalPages, content, number, first, last, size } = data;
        this.users = content;
        this.totalPage = totalPages;
        this.actualPage = number;
        this.size = size;
        this.first = first;
        this.last = last;
        this.initialArray(this.totalPage);
      },
      (err) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  }
  
  deleteUser = (id: number) => {
    this.userService.deleteUser(id)
    .subscribe({
      next: data =>{
        this.messageService.setMessage('User successfully removed');
        this.ngOnInit();
      },
      error: error =>{
        console.log(error)
      }
  });
  }

  public decrementNumPage = (): void => {
    if (this.numPage > 0) {
      this.numPage--;
    }
    this.getAll()
    this.router.navigateByUrl("/users?page="+(this.numPage + 1));
  };

  public modifyNumPage = (num: number): void => {
    this.numPage = num;
    this.getAll()
    this.router.navigateByUrl("/users?page="+(this.numPage + 1));
  };

  public incrementNumPage = (): void => {
    if (this.numPage < this.totalPage) {
      this.numPage++;
    }
    this.getAll()
    this.router.navigateByUrl("/users?page="+(this.numPage + 1));
  };

  private initialArray = (total: number) => {
    for (let index = 0; index < total; index++) {
      this.arrayNumber[index] = index + 1;
    }
  };
}

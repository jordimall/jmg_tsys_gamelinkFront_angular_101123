import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';
import { MessageService } from './../../services/message.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent implements OnInit {
  message: string = '';
  tagList: Tag[] | any;
  numPage: number | any = 0;
  totalPage: number = 0;
  actualPage: number = 0;
  size: number = 7;
  first: boolean = true;
  last: boolean = true;
  arrayNumber: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService,
    private messageService: MessageService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') === null) {
        this.numPage = Number.parseInt(params.get('page') ?? '1') - 1 ?? 0;
      }
    });

    this.getAll();
  }

  private getAll() {
    this.message = this.messageService.getMessage();
    this.tagService.allTagPaginate(this.numPage, this.size).subscribe(
      (data: any) => {
        const { totalPages, content, number, first, last, size } = data;
        this.tagList = content;
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

  deleteTag = (id: number): void => {
    this.tagService.deleteTag(id).subscribe(
      (data: any) => {
        this.messageService.setMessage('Tag successfully removed');
        this.ngOnInit();
      },
      (err: any) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  };

  public decrementNumPage = (): void => {
    if (this.numPage > 0) {
      this.numPage--;
    }
    this.getAll();
    this.router.navigateByUrl(`/tags?page=${this.numPage + 1}`);
  };

  public modifyNumPage = (num: number): void => {
    this.numPage = num;
    this.getAll();
    this.router.navigateByUrl(`/tags?page=${this.numPage + 1}`);
  };

  public incrementNumPage = (): void => {
    if (this.numPage < this.totalPage) {
      this.numPage++;
    }
    this.getAll();
    this.router.navigateByUrl(`/tags?page=${this.numPage + 1}`);
  };

  private initialArray = (total: number) => {
    for (let index = 0; index < total; index++) {
      this.arrayNumber[index] = index + 1;
    }
  };

  public isAdmin = (): boolean => {
    if (this.tokenService.getDecodedToken().role === 'ADMIN') {
      return true;
    }
    return false;
  };
}

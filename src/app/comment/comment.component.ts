import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/internal/operators/pluck';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


comments$ = this.commentService.getcomments();

comment$ = this.activatedRoute.data.pipe(pluck('comments'),);

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute ){}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(data => {console.log(data['comments'])});


  }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {
  btnText= 'Publicar';

  constructor(
    private momentService: MomentService, 
    private messagesService: MessagesService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moment) {
    const formData = new FormData()

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    //todo

    //send service
    await this.momentService.createMoment(formData).subscribe();

    //display message
    this.messagesService.add('Momento adicionado com sucesso!');

    //redirect
    this.router.navigate(['/']);

  }

}

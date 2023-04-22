import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AspquerygeneratorService } from 'src/app/service/aspquerygenerator.service';
import { GetDataService } from 'src/app/service/get-data.service';
import { VoiceRecognitionService } from 'src/app/service/voice-recognition.service';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private getDataService: GetDataService,
    public service: VoiceRecognitionService,
    private aspQueryGeneratorService: AspquerygeneratorService
  ) {}

  ngOnInit() {
    this.service.init();
  }
  title = 'bot';
  @ViewChild('chatListContainer', { static: false })
  chatListContainer!: ElementRef;
  chatInput: string = '';

  currentUser = {
    name: 'Nithin',
    id: 1,
    profileImageUrl:
      'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=1380&t=st=1680309439~exp=1680310039~hmac=a79b247de9dd39e116050013ed9ebd11671d7a5060e00ee8f599d7c81ec3dd11',
  };
  user1 = {
    name: 'Bot',
    id: 2,
    profileImageUrl:
      'https://img.freepik.com/premium-vector/cute-robot-operating-laptop-cartoon-icon-illustration-science-technology-icon-concept-isolated-flat-cartoon-style_138676-1776.jpg?w=1380',
  };
  chatMessages: {
    user: any;
    messages: string;
    created_at: number;
  }[] = [
    {
      user: this.user1,
      messages: 'Hii, How can I help you?',
      created_at: Date.now(),
    },
    // {
    //   user: this.currentUser,
    //   messages: "We should go on a vacation",
    //   created_at: Date.now()
    // },
  ];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  send() {
    this.chatMessages.push({
      messages: this.chatInput,
      user: this.currentUser,
      created_at: Date.now(),
    });
    console.log('This Question -->' + this.chatInput);
    //Get Query from input taken from above
    let data = this.aspQueryGeneratorService.genQuery(this.chatInput);
    if (data != '') {
      this.chatMessages.push({
        messages:
          'Sorry! Could not find the answer,Try again with different Question.',
        user: this.user1,
        created_at: Date.now(),
      });
    } else {
      //Get Data
      this.getDataService.getData(data).subscribe((data) => {
        let ans = data.split('X')[2].split('<br />')[0].replace('=', '').trim();
        this.chatMessages.push({
          messages: ans,
          user: this.user1,
          created_at: Date.now(),
        });
      });
      //Making ChatInput Empty
    }

    this.chatInput = '';
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.chatListContainer.nativeElement.scrollTop =
      this.chatListContainer.nativeElement.scrollHeight;
  }
  listen() {
    //Speech
    this.captureTextFromvoice();
  }

  isEnableListen: boolean = false;
  private captureTextFromvoice() {
    if (!this.isEnableListen) {
      this.service.start();
    } else {
      this.service.stop();
      this.chatInput = this.service.text;
    }
    this.isEnableListen = !this.isEnableListen;
  }
  onRecivedData(data: any) {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images = [
    {src:"https://media1.tenor.com/images/210568a648ae3f23706dff3a13e0c334/tenor.gif?itemid=11052448", width:"100%"},
    {src:"https://media1.tenor.com/images/9b12a45c6fd9d1b5872fbd5e7f0c6e1e/tenor.gif?itemid=11212500", width:"100%"},
    {src:"https://media1.tenor.com/images/bfb8f03b5496875da2d2fc75637ca6d5/tenor.gif?itemid=10583277", alt:"santas coming", width:"100%"},
    {src:"https://media.giphy.com/media/ZYEFCCYK0M8stiPgfq/giphy.gif", width:"100%"},
    {src:"https://64.media.tumblr.com/tumblr_m7qr92zrRu1rq09pxo1_500.gif", alt:"avatar shopping", width:"404px"},
    {src:"https://media1.tenor.com/images/235e74b567fa4887d0a8ebc2c42c0078/tenor.gif?itemid=4698499",alt:"thrift shop", width:"100%"},
    {src:"https://media.giphy.com/media/sRJNptk8JF9wk/giphy.gif", width:"100%"},
    {src:"https://media.giphy.com/media/fAhOtxIzrTxyE/giphy.gif", alt:"shopping ducks", width:"100%"},
    {src:"https://media.giphy.com/media/3orif2ozOrARd4r63C/giphy.gif", width:"100%"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

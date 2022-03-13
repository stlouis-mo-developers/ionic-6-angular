import { Component, ViewEncapsulation } from '@angular/core'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html',
  styleUrls: ['footer.scss'],
})
export class Footer{
  
  websiteName = environment.WEBSITE_NAME;
  constructor( ) { }

}

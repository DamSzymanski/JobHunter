import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../models/jobOffer';
import { JobOfferService } from '../services/job-offer.service';
import { BidOffer } from '../models/BidOffer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.css']
})
export class OfferlistComponent implements OnInit {
  loading: boolean;
  p: number = 1;
  cost: number;
  offer: JobOffer[];
  canBid: boolean;
  constructor(private job: JobOfferService, private auth: AuthService) {
    this.offer = [];
    this.loading = true;
    this.cost = 0;
    this.canBid = false;
  }

  ngOnInit() {
    this.job.get().subscribe(res => {
      this.offer = res;
      this.offer.forEach(x => x.bidding = false)
      this.loading = false;
    })
    this.auth.isLoggedIn().subscribe(res => this.canBid = res);
  }
  applyFor(offerId: number) {
    if (this.cost != 0 ) {
      console.log(this.cost)
      var bid = new BidOffer();
      bid.JobOfferId = offerId;
      bid.OfferDate = new Date();
      bid.Proposition = this.cost;
      this.job.applyFor(bid).subscribe(res => {
        if (res == 1)
          alert("Sukces")
        else ("Error")
        this.offer.forEach(x => x.bidding = false)

      })
    }
  }
  bid(offerId: number) {
    this.offer.forEach(x => x.bidding = false)
    console.log(offerId)
    this.offer.forEach(x => {
      if (x.id == offerId)
        x.bidding = true;


    })
  }
}

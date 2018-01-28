import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from "angularfire2/database-deprecated";
import { Subscription } from "rxjs/Subscription"

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-shopping-item",
  templateUrl: "edit-shopping-item.html"
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shopingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    // Capturing the shoppingItemId as navparam
    const shoppingItemId = this.navParams.get("shoppingItemId");

    // Set the scope of our Firebase Object equal to our selected item
    this.shopingItemRef$ = this.database.object(
      `shopping-list/${shoppingItemId}`
    );

    // Subscribe to the Object and assign the result to this.shoppingItem
    this.shoppingItemSubscription = this.shopingItemRef$.subscribe(shoppingItem => (this.shoppingItem = shoppingItem));
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    // Updating our firebase node with new item data
    this.shopingItemRef$.update(shoppingItem);

    // Send the usser back to the shopping list page.
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // unsubscribe from the observable when leaving hte page
    this.shoppingItemSubscription.unsubscribe();
  }

}

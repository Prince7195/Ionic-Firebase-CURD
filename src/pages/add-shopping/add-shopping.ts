import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database-deprecated";

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

/**
 * Generated class for the AddShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-shopping",
  templateUrl: "add-shopping.html"
})
export class AddShoppingPage {
  // creating a new object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    this.shoppingItemRef$ = this.database.list("shopping-list");

    /**
     * shopping-list:
     *  0:
     *    itemName: "Pizza",
     *    itemNumber: 2
     *  1:
     *    itemName: "cake",
     *    itemNumber: 4
     */
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    /**
     * Create a new anonymous object and convert itemNumber to a number.
     * Push this to out firebase database under the 'shopping-list' node.
     */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Reset our ShoppingItem
    // this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to Shopping list Page
    this.navCtrl.pop();
  }
}

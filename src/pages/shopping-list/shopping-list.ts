import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database-deprecated";

import { ShoppingItem } from "../../models/shopping-item/shopping-item.interface";

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html"
})
export class ShoppingListPage {
  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController
  ) {
    // Pointing shoppinglistRef$ at firebase -> 'shopping-list' node.
    this.shoppingListRef$ = this.database.list("shopping-list");
    console.log(this.shoppingListRef$);
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push("AddShoppingPage");
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    /**
     * Display an ActionSheet that gives the user the following options:
     *  1. Edit the shopping item
     *  2. Delete the shopping item
     *  3. Cancel selection
     */
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // Send the user to edit page and passing the key as a parameter
            this.navCtrl.push("EditShoppingItemPage", {
              shoppingItemId: shoppingItem.$key
            });
          }
        },
        {
          text: 'Delete',
          role: 'destruction',
          handler: () => {
            // Delete the current Shopping Item
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          // role: 'cancel',
          handler: () => {
            console.log('User selected the cancel button');
          }
        }
      ]
    }).present();
  }
}

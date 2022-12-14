/*
 * SmartCart 2.0 plugin
 * jQuery Shopping Cart Plugin
 * by Dipu
 */
function loadCart(
  sturmankersVorderseite,
  sturmankersRuckseite,
  sturmankerMat,
  allPosts,
  fencePostMat,
  allWoodPosts,
  woodMaterials,
  allFences,
  postWoodMaterials,
  addFenceSings,
  fencesArr,
  roots,
  metalParts,
  kapijaPartsArr,
  allLprofilesComb,
  fakeFronts,
  fakeBacks,
  fakeLefts,
  fakeRights,
  wholeFences
) {
  (function ($) {
    $.fn.smartCart = function (options) {
      var options = $.extend({}, $.fn.smartCart.defaults, options);

      return this.each(function () {
        var obj = $(this);
        var products = $("input[type=hidden]", obj);
        var resultName = options.resultName;
        var cartItemCount = 0;
        var cartProductCount = 0;
        var subTotal = 0;
        var toolMaxImageHeight = 80;
        var attrProductId = "pid";
        var attrProductName = "pname";
        var attrProductPrice = "pprice";
        var attrProductImage = "pimage";
        var attrCategoryName = "pcategory";

        var labelCartMenuName = "Warenkorb (_COUNT_)";
        var labelCartMenuNameTooltip =
          "Warenkorb | Art. _PRODUCTCOUNT_ | Menge _ITEMCOUNT_";
        var labelProductMenuName = "Elemente hinzufügen";
        var labelSearchButton = "Search";
        var labelSearchText = "Search";
        var labelCategoryText = "Kategorien";
        var labelClearButton = "Clear";
        var labelAddToCartButton = "In den Warenkorb";
        var labelQuantityText = "Menge";
        var labelProducts = "Artikel";
        var labelPrice = "Preis / Stk.";
        var labelSubtotal = "Endpreis";
        var labelTotal = "Gesamtpreis";
        var labelRemove = "Löschen";
        var labelCheckout = "Weiter";

        var messageConfirmRemove =
          'Sind Sie wirklich sicher, dass Sie "_PRODUCTNAME_" aus dem Warenkorb entfernen möchten?';
        var messageCartEmpty = "Ihr Warenkorb ist leer";
        var messageProductEmpty = "---";
        var messageProductAddError = "Hinzufügen zum Warenkorb nicht möglich.";
        var messageItemAdded = "Zum Warenkorb hinzugefügt";
        var messageItemRemoved = "Artikel gelöscht";
        var messageQuantityUpdated = "aktualisiert";
        var messageQuantityErrorAdd =
          "Fehlmenge. Hinzufügen zum Warenkorb nicht möglich.";
        var messageQuantityErrorUpdate = "Fehlmenge.";

        var txtvat = "Alle Preise inkl. gesetzl. MwSt.";

        //Create Main Menu
        cartMenu = labelCartMenuName.replace("_COUNT_", "0"); // display default
        var btShowCart = $("<a>" + cartMenu + "</a>")
          .attr("href", "#scart")
          .addClass("button secondary");
        var btShowProductList = $("<a>" + labelProductMenuName + "</a>")
          .attr("href", "#sproducts")
          .addClass("button secondary");
        var msgBox2 = $("<div></div>")
          .attr("id", "messBar")
          .addClass("scMessageBar2")
          .hide();

        var elmProductMenu = $("<div></div>")
          .addClass("cell medium-3 small-6")
          .append(btShowProductList);
        var elmCartMenu = $("<div></div>")
          .addClass("cell medium-3 small-6")
          .append(btShowCart);
        var elmMsgBox = $("<div></div>").addClass("").append(msgBox2);
        var elmMenuBar = $("<div></div>")
          .addClass("scMenuBar button-group")
          .append(btShowCart)
          .append(btShowProductList)
          .append(elmMsgBox);
        obj.prepend(elmMenuBar);

        // Create Search Elements
        var elmPLSearchPanel = $("<div></div>").addClass(
          "scSearchPanel grid-x grid-padding-x align-center-middle addmt"
        );

        // Create Category filter
        if (options.enableCategoryFilter) {
          var lblCategory = $(
            "<div><p>" + labelCategoryText + ":</p></div>"
          ).addClass("scLabelCategory cell shrink");
          var elmCategory = $("<select></select>").addClass("scSelCategory");
          var divC = $("<div></div>").addClass("cell shrink");
          divC.append(elmCategory);
          elmPLSearchPanel.append(lblCategory).append(divC);
          fillCategory();
        }

        // Create Product List
        var elmPLContainer = $("<div></div>").addClass("scTabs").hide();
        elmPLContainer.prepend(elmPLSearchPanel);

        var elmPLProducts = $("<div></div>").addClass("scProductList");
        elmPLContainer.append(elmPLProducts);

        // Create Cart
        var elmCartContainer = $("<div></div>").addClass("scTabs").hide();
        var elmCartHeader = $("<div></div>").addClass(
          "grid-x grid-padding-x show-for-large align-middle cartngl"
        );
        var elmCartHeaderTitle1 = $(
          "<div>" + labelProducts + "</div>"
        ).addClass("cell large-5");
        var elmCartHeaderTitle2 = $("<div>" + labelPrice + "</div>").addClass(
          "cell large-2  text-center"
        );
        var elmCartHeaderTitle3 = $(
          "<div>" + labelQuantityText + "</div>"
        ).addClass("cell large-2 text-center");
        var elmCartHeaderTitle4 = $(
          "<div>" + labelSubtotal + "</div>"
        ).addClass("cell large-2 text-center");
        var elmCartHeaderTitle5 = $("<div></div>").addClass("cell large-1");
        elmCartHeader
          .append(elmCartHeaderTitle1)
          .append(elmCartHeaderTitle2)
          .append(elmCartHeaderTitle3)
          .append(elmCartHeaderTitle4)
          .append(elmCartHeaderTitle5);

        var elmCartList = $("<div></div>").addClass("scCartList");
        elmCartContainer.append(elmCartHeader).append(elmCartList);

        obj.append(elmPLContainer).append(elmCartContainer);

        // Create Bottom bar
        var elmBottomBar = $("<div></div>").addClass(
          "scBottomBar grid-x grid-padding-x grid-padding-y align-middle"
        );

        var elmW1 = $("<div></div>").addClass("cell large-8");
        var elmBottomSubtotalText = $(
          "<label>" + labelTotal + ":</label>"
        ).addClass("scLabelSubtotalText");
        var elWaluta = $("<label>EUR</label>").addClass("scWalutaText");
        var elmBottomSubtotalValue = $(
          "<label>" + getMoneyFormatted(subTotal) + "</label>"
        ).addClass("scLabelSubtotalValue");

        var elmW2 = $("<div></div>").addClass("cell large-1 text-right");
        var btCheckout = $("<a>" + labelCheckout + "</a>")
          .attr("href", "#")
          .addClass("scCheckoutButton button");
        $(btCheckout).click(function () {
          // $(this).parents("form").submit();

          parent.linkshare();
          $(this).hide();
          return false;
        });

        var elmW3 = $("<div></div>").addClass("cell large-3");

        elmW1
          .append(elWaluta)
          .append(elmBottomSubtotalValue)
          .append(elmBottomSubtotalText)
          .append('<p class="vat">' + txtvat + "</p>");
        elmW2.append(btCheckout);
        elmBottomBar.append(elmW3).append(elmW1).append(elmW2);
        obj.append(elmBottomBar);

        // Create Tooltip
        var tooltip = $("<div></div>").addClass("tooltip").hide();
        obj.append(tooltip);
        obj.bind("mousemove", function () {
          tooltip.hide();
          return true;
        });

        // Create SelectList
        var elmProductSelected = $('select[name="' + resultName + '"]', obj);
        if (elmProductSelected.length <= 0) {
          elmProductSelected = $("<select></select>")
            .attr("name", resultName)
            .attr("multiple", "multiple")
            .hide();
          refreshCartValues();
        } else {
          elmProductSelected.attr("multiple", "multiple").hide();
          populateCart(); // pre-populate cart if there are selected items
        }
        obj.append(elmProductSelected);

        // prepare the product list
        populateProducts();

        if (options.selected == "1") {
          showCart();
        } else {
          showProductList();
        }

        $(btShowProductList).bind("click", function (e) {
          showProductList();
          return false;
        });
        $(btShowCart).bind("click", function (e) {
          showCart();
          return false;
        });

        function showCart() {
          $(btShowProductList).removeClass("sel");
          $(btShowCart).addClass("sel");
          $(elmPLContainer).hide();
          $(elmCartContainer).show();
        }
        function showProductList() {
          $(btShowProductList).addClass("sel");
          $(btShowCart).removeClass("sel");
          $(elmCartContainer).hide();
          $(elmPLContainer).show();
        }

        function addToCart(i, qty) {
          var addProduct = products.eq(i);
          if (addProduct.length > 0) {
            if ($.isFunction(options.onAdd)) {
              // calling onAdd event; expecting a return value
              // will start add if returned true and cancel add if returned false
              if (!options.onAdd.call(this, $(addProduct), qty)) {
                return false;
              }
            }
            var pId = $(addProduct).attr(attrProductId);
            var pName = $(addProduct).attr(attrProductName);
            var pPrice = $(addProduct).attr(attrProductPrice);
            var uid = $(addProduct).attr("uid");
            var pabm = $(addProduct).attr("pabm");

            // Check wheater the item is already added
            var productItem = elmProductSelected.children(
              "option[rel=" + i + "]"
            );
            if (productItem.length > 0) {
              // Item already added, update the quantity and total
              var curPValue = productItem.attr("value");
              var valueArray = curPValue.split("|");
              var prdId = valueArray[0];
              var prdQty = valueArray[1];
              prdQty = prdQty - 0 + (qty - 0);
              var newPValue =
                prdId +
                "|" +
                prdQty +
                "|" +
                pName +
                "|" +
                pPrice +
                "|" +
                uid +
                "|" +
                pabm;
              productItem.attr("value", newPValue).attr("selected", true);
              var prdTotal = getMoneyFormatted(pPrice * prdQty);
              // Now go for updating the design
              var lalQuantity = $("#lblQuantity" + i).val(prdQty);

              var wBrutto =
                '<label class="hide-for-large">' +
                labelSubtotal +
                ": </label>" +
                prdTotal +
                '<label class="hide-for-large"> EUR</label>';

              var lblTotal = $("#lblTotal" + i).html(wBrutto);
              // show product quantity updated message
              showHighlightMessage(messageQuantityUpdated);
            } else {
              // This is a new item so create the list
              var prodStr =
                pId +
                "|" +
                qty +
                "|" +
                pName +
                "|" +
                pPrice +
                "|" +
                uid +
                "|" +
                pabm;
              productItem = $("<option></option>")
                .attr("rel", i)
                .attr("value", prodStr)
                .attr("selected", true)
                .html(pName);
              elmProductSelected.append(productItem);
              addCartItemDisplay(addProduct, qty);
              // show product added message
              showHighlightMessage(messageItemAdded);
            }
            // refresh the cart
            refreshCartValues();
            // calling onAdded event; not expecting a return value
            if ($.isFunction(options.onAdded)) {
              options.onAdded.call(this, $(addProduct), qty);
            }
          } else {
            showHighlightMessage(messageProductAddError);
          }
        }

        function addCartItemDisplay(objProd, Quantity) {
          var pId = $(objProd).attr(attrProductId);
          var pIndex = products.index(objProd);
          var pName = $(objProd).attr(attrProductName);
          var pPrice = $(objProd).attr(attrProductPrice);
          var prodImgSrc = $(objProd).attr(attrProductImage);
          var pTotal = (pPrice - 0) * (Quantity - 0);
          pTotal = getMoneyFormatted(pTotal);

          pTotal =
            '<label class="hide-for-large">' +
            labelSubtotal +
            ": </label>" +
            pTotal +
            '<label class="hide-for-large"> EUR</label>';

          var pCena = getMoneyFormatted(pPrice - 0);
          pCena =
            '<label class="hide-for-large">Preis: </label>' +
            pCena +
            '<label class="hide-for-large"> </label>';

          $(".scMessageBar", elmCartList).remove();

          var elmCPTitle1 = $("<div></div>").addClass(
            "cell large-5 no-left-pad"
          );
          if (prodImgSrc && options.enableImage && prodImgSrc.length > 0) {
            var prodImg = $("<img alt=''></img>")
              .attr("src", prodImgSrc)
              .addClass("scProductImageSmall");
            var scImg = $("<div></div>").addClass("scPDiv1");
            scImg.append(prodImg);
            elmCPTitle1.append(scImg);
          }
          var elmCP = $("<div></div>")
            .attr("id", "divCartItem" + pIndex)
            .addClass("grid-x grid-padding-x align-middle cartpad");

          var pTitle = pName;
          var phtml = formatTemplate(options.cartItemTemplate, $(objProd));
          var elmCPContent = $("<div></div>").html(phtml).attr("title", pTitle);
          elmCPTitle1.append(elmCPContent);

          var elmCPTitle2 = $("<div>" + pCena + "</div>").addClass(
            "cell large-2  medium-6 text-right"
          );
          var inputQty = $('<input type="text" value="' + Quantity + '" />')
            .attr("id", "lblQuantity" + pIndex)
            .attr("rel", pIndex)
            .addClass("scTxtQuantity2");
          $(inputQty).bind("change", function (e) {
            var newQty = $(this).val();
            var prodIdx = $(this).attr("rel");
            newQty = newQty - 0;
            if (validateNumber(newQty)) {
              updateCartQuantity(prodIdx, newQty);
            } else {
              var productItem = elmProductSelected.children(
                "option[rel=" + prodIdx + "]"
              );
              var pValue = $(productItem).attr("value");
              var valueArray = pValue.split("|");
              var pQty = valueArray[1];
              $(this).val(pQty);
              showHighlightMessage(messageQuantityErrorUpdate);
            }
            return true;
          });

          var elmCPTitle3 = $("<div></div>")
            .append('<label class="hide-for-large">Menge: </label>')
            .append(inputQty)
            .addClass("cell large-2 medium-6   text-right medium-text-center");

          var elmCPTitle4 = $("<div>" + pTotal + "</div>")
            .attr("id", "lblTotal" + pIndex)
            .addClass("cell large-2 medium-6  text-right");
          var btRemove = $('<a><img src="img/deleteCart.svg"></a>')
            .attr("rel", pIndex)
            .attr("href", "#")
            .addClass("scRemove button")
            .attr("title", labelRemove);
          $(btRemove).bind("click", function (e) {
            var idx = $(this).attr("rel");
            removeFromCart(idx);
            return false;
          });
          var elmCPTitle5 = $("<div></div>").addClass(
            "cell large-1 medium-6 text-right large-text-center noborder"
          );
          elmCPTitle5.append(btRemove);

          elmCPTitle1.append(elmCPContent);
          elmCP
            .append(elmCPTitle1)
            .append(elmCPTitle2)
            .append(elmCPTitle3)
            .append(elmCPTitle4)
            .append(elmCPTitle5);
          elmCartList.append(elmCP);
        }

        function ConfirmD(title, message, callback) {
          // create your modal template
          var modal =
            '<div class="reveal tiny" id="confirmation">' +
            '<h3 style="text-align:center; background-color:#ddd; color:#f47920;">' +
            title +
            "</h3>" +
            '<p class="lead">' +
            message +
            "</p>" +
            '<button class="button yes">OK</button>' +
            '<button class="button secondary float-right" data-close>abbrechen</button>' +
            "</div>";
          // appending new reveal modal to the page
          $("body").append(modal);
          // registergin this modal DOM as Foundation reveal
          var confirmation = new Foundation.Reveal($("#confirmation"));
          // open
          confirmation.open();
          // listening for yes click

          $("#confirmation")
            .children(".yes")
            .on("click", function () {
              confirmation.close();
              $("#confirmation").remove();
              // calling the function to process
              callback.call();
            });
          $(document).on("closed.zf.reveal", "#confirmation", function () {
            $("#confirmation").remove();
          });
        }

        function removeFromCart(idx) {
          var pObj = products.eq(idx);
          var pName = $(pObj).attr(attrProductName);
          var removeMsg = messageConfirmRemove.replace("_PRODUCTNAME_", pName); // display default
          //if(confirm(removeMsg)){

          ConfirmD("?", removeMsg, function () {
            if ($.isFunction(options.onRemove)) {
              // calling onRemove event; expecting a return value
              // will start remove if returned true and cancel remove if returned false
              if (!options.onRemove.call(this, $(pObj))) {
                return false;
              }
            }
            var productItem = elmProductSelected.children(
              "option[rel=" + idx + "]"
            );
            var pValue = $(productItem).attr("value");
            var valueArray = pValue.split("|");
            var pQty = valueArray[1];
            productItem.remove();
            $("#divCartItem" + idx, elmCartList).slideUp("slow", function () {
              $(this).remove();
              showHighlightMessage(messageItemRemoved);
              //Refresh the cart
              refreshCartValues();
            });
            if ($.isFunction(options.onRemoved)) {
              // calling onRemoved event; not expecting a return value
              options.onRemoved.call(this, $(pObj));
            }
          });
          //}
        }

        function updateCartQuantity(idx, qty) {
          var pObj = products.eq(idx);
          var productItem = elmProductSelected.children(
            "option[rel=" + idx + "]"
          );
          var pPrice = $(pObj).attr(attrProductPrice);
          var pName = $(pObj).attr(attrProductName);
          var uid = $(pObj).attr("uid");
          var pValue = $(productItem).attr("value");
          var valueArray = pValue.split("|");
          var prdId = valueArray[0];
          var curQty = valueArray[1];
          if ($.isFunction(options.onUpdate)) {
            // calling onUpdate event; expecting a return value
            // will start Update if returned true and cancel Update if returned false
            if (!options.onUpdate.call(this, $(pObj), qty)) {
              $("#lblQuantity" + idx).val(curQty);
              return false;
            }
          }

          var newPValue =
            prdId + "|" + qty + "|" + pName + "|" + pPrice + "|" + uid;
          $(productItem).attr("value", newPValue).attr("selected", true);
          var prdTotal = getMoneyFormatted(pPrice * qty);
          // Now go for updating the design
          var wBrutto =
            '<label class="hide-for-large">' +
            labelSubtotal +
            ": </label>" +
            prdTotal +
            '<label class="hide-for-large"> EUR</label>';

          var lblTotal = $("#lblTotal" + idx).html(wBrutto);
          showHighlightMessage(messageQuantityUpdated);
          //Refresh the cart
          refreshCartValues();
          if ($.isFunction(options.onUpdated)) {
            // calling onUpdated event; not expecting a return value
            options.onUpdated.call(this, $(pObj), qty);
          }
        }

        function refreshCartValues() {
          var sTotal = 0;
          var cProductCount = 0;
          var cItemCount = 0;
          elmProductSelected.children("option").each(function (n) {
            var pIdx = $(this).attr("rel");
            var pObj = products.eq(pIdx);
            var pValue = $(this).attr("value");
            var valueArray = pValue.split("|");
            var prdId = valueArray[0];
            var pQty = valueArray[1];
            var pPrice = $(pObj).attr(attrProductPrice);
            sTotal = sTotal + (pPrice - 0) * (pQty - 0);
            cProductCount++;
            cItemCount = cItemCount + (pQty - 0);
          });
          subTotal = sTotal;
          cartProductCount = cProductCount;
          cartItemCount = cItemCount;
          elmBottomSubtotalValue.html(getMoneyFormatted(subTotal));
          cartMenu = labelCartMenuName.replace("_COUNT_", cartItemCount);
          cartMenuTooltip = labelCartMenuNameTooltip
            .replace("_PRODUCTCOUNT_", cartProductCount)
            .replace("_ITEMCOUNT_", cartItemCount);
          btShowCart.html(cartMenu).attr("title", cartMenuTooltip);
          $("#bcart span").text(cartItemCount);
          $("#curPage span").text(cartItemCount);

          $(".scCheckoutButton").hide();
          if (cProductCount <= 0) {
            showMessage(messageCartEmpty, elmCartList);
          } else {
            $(".scMessageBar", elmCartList).remove();
          }
        }

        function populateCart() {
          elmProductSelected.children("option").each(function (n) {
            var curPValue = $(this).attr("value");
            var valueArray = curPValue.split("|");
            var prdId = valueArray[0];
            var prdQty = valueArray[1];
            if (!prdQty) {
              prdQty = 1; // if product quantity is not present default to 1
            }
            var objProd = jQuery.grep(products, function (n, i) {
              return $(n).attr(attrProductId) == prdId;
            });
            var prodIndex = products.index(objProd[0]);
            var prodName = $(objProd[0]).attr(attrProductName);
            $(this).attr("selected", true);
            $(this).attr("rel", prodIndex);
            $(this).html(prodName);
            cartItemCount++;
            addCartItemDisplay(objProd[0], prdQty);
          });
          // Reresh the cart
          refreshCartValues();
        }

        function fillCategory() {
          var catCount = 0;
          var catItem = $("<option></option>")
            .attr("value", "")
            .attr("selected", true)
            .html("Alle");
          elmCategory.prepend(catItem);
          $(products).each(function (i, n) {
            var pCategory = $(this).attr(attrCategoryName);
            if (pCategory && pCategory.length > 0) {
              var objProd = jQuery.grep(
                elmCategory.children("option"),
                function (n, i) {
                  return $(n).val() == pCategory;
                }
              );
              if (objProd.length <= 0) {
                catCount++;
                var catItem = $("<option></option>")
                  .attr("value", pCategory)
                  .html(pCategory);
                elmCategory.append(catItem);
              }
            }
          });
          if (catCount > 0) {
            $(elmCategory).bind("change", function (e) {
              // $(txtSearch).val('');
              populateProducts();
              return true;
            });
          } else {
            elmCategory.hide();
            lblCategory.hide();
          }
        }

        function populateProducts(searchString) {
          var isSearch = false;
          var productCount = 0;
          var selectedCategory = $(elmCategory).children(":selected").val();
          // validate and prepare search string
          if (searchString) {
            searchString = trim(searchString);
            if (searchString.length > 0) {
              isSearch = true;
              searchString = searchString.toLowerCase();
            }
          }
          // Clear the current items on product list
          elmPLProducts.html("");
          // Lets go for dispalying the products
          $(products).each(function (i, n) {
            var productName = $(this).attr(attrProductName);
            var productCategory = $(this).attr(attrCategoryName);
            var isValid = true;
            var isCategoryValid = true;

            var lic = $(this).attr("lic");

            if (lic > 0) {
              addToCart(i, lic);
            }

            if (isSearch) {
              if (productName.toLowerCase().indexOf(searchString) == -1) {
                isValid = false;
              } else {
                isValid = true;
              }
            }
            // Category filter
            if (selectedCategory && selectedCategory.length > 0) {
              selectedCategory = selectedCategory.toLowerCase();
              if (
                productCategory.toLowerCase().indexOf(selectedCategory) == -1
              ) {
                isCategoryValid = false;
              } else {
                isCategoryValid = true;
              }
            }

            if (isValid && isCategoryValid) {
              productCount++;
              var productPrice = $(this).attr(attrProductPrice);
              var prodImgSrc = $(this).attr(attrProductImage);

              var elmProdDiv1 = $("<div></div>").addClass("scImg");
              if (prodImgSrc && options.enableImage && prodImgSrc.length > 0) {
                var prodImg = $("<img alt=''></img>")
                  .attr("src", prodImgSrc)
                  .addClass("scProductImage");
                elmProdDiv1.append(prodImg);
              }

              var elmProdDiv2 = $("<div></div>").addClass(
                "scPDiv2 cell small-8 medium-6"
              ); // for product name, desc & price
              var productHtml = formatTemplate(
                options.productItemTemplate,
                $(this)
              );
              elmProdDiv2.html(productHtml);

              var elmProdDiv3 = $("<div></div>").addClass(
                "scPDiv3 cell small-3 medium-1 text-center align-self-bottom"
              ); // for button & qty
              var btAddToCart = $("<a>" + labelAddToCartButton + "</a>")
                .attr("href", "#")
                .attr("rel", i)
                .attr("title", labelAddToCartButton)
                .addClass("scAddToCart button");
              $(btAddToCart).bind("click", function (e) {
                var idx = $(this).attr("rel");
                var qty = $(this).parent().parent().find("input").val();
                if (validateNumber(qty)) {
                  addToCart(idx, qty);
                } else {
                  $(this).siblings("input").val(1);
                  showHighlightMessage(messageQuantityErrorAdd);
                }
                return false;
              });

              var inputQty = $('<input type="text" value="1" />').addClass(
                "scTxtQuantity"
              );
              var labelQty = $(
                "<label>" + labelQuantityText + ":</label>"
              ).addClass("scLabelQuantity");
              elmProdDiv3.append(labelQty).append(inputQty);

              var butKontener = $("<div></div").addClass(
                "cell small-8 medium-shrink align-self-bottom"
              );
              butKontener.append(btAddToCart);

              var elmProds = $("<div></div>").addClass(
                "scProducts grid-x grid-padding-y grid-padding-x"
              );

              elmProds
                .append(
                  '<div class=" cell small-4 medium-shrink">' +
                    elmProdDiv1.wrap("<p/>").parent().html() +
                    "</div>"
                )
                .append(elmProdDiv2)
                .append(elmProdDiv3)
                .append(butKontener);
              elmPLProducts.append(elmProds);
            }
          });

          if (productCount <= 0) {
            showMessage(messageProductEmpty, elmPLProducts);
          }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //ADD TO CART
        let cartItems = [];
        var mrk = () => {
          $(".scCartList").empty();
          elmProductSelected.empty();
          refreshCartValues();
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i] > 0) {
              addToCart(i, cartItems[i]);
            }
          }
        };
        //CART
        let priceBut = document.getElementById("price-but");
        let cartFade = document.getElementById("cart-fade");
        let cartMainSection = document.getElementById("cart-main-section");
        let cartCloseBtn = document.getElementById("cart-close-btn");
        //populate cart
        priceBut.onclick = () => {
          if (cartPricesLoaded[0]) {
            removeSideAccesories(
              sideAccesories,
              deleteAccesorie,
              addFenceAcc,
              editPost,
              addNewFenceToSide
            );
            addDefaultMaterial(
              sturmankersVorderseite,
              sturmankersRuckseite,
              sturmankerMat,
              allPosts,
              fencePostMat,
              allWoodPosts,
              woodMaterials,
              allFences,
              postWoodMaterials,
              addFenceSings,
              fencesArr
            );
            //open cart sections
            cartFade.style.display = "block";
            cartMainSection.style.display = "block";
            // // // populate main boards
            let rhombus180180LarcheCart = 0;
            let rhombus90180LarcheCart = 0;
            let rhombus60180LarcheCart = 0;
            let rhombus150180LarcheCart = 0;
            let raRhombus60180LarcheCart = 0;
            let raRhombus50180LarcheCart = 0;
            let kapijaCart = 0;
            let kapijaParts1Cart = 0;
            let kapijaParts2Cart = 0;
            let kapijaParts3Cart = 0;

            for (let i = 0; i < allFences.length; i++) {
              // if (fencesArr[i].color == "grau") {
              if (allFences[i][0].isVisible) rhombus180180LarcheCart += 1;
              if (allFences[i][1].isVisible) rhombus90180LarcheCart += 1;
              if (allFences[i][2].isVisible) rhombus60180LarcheCart += 1;
              if (allFences[i][3].isVisible) rhombus150180LarcheCart += 1;
              if (allFences[i][4].isVisible) raRhombus60180LarcheCart += 1;
              if (allFences[i][5].isVisible) raRhombus50180LarcheCart += 1;
              if (allFences[i][6].isVisible) {
                kapijaCart += 1;
                if (kapijaPartsArr[i].material.name == "kapijaPartsMat1")
                  kapijaParts1Cart += 1;
                if (kapijaPartsArr[i].material.name == "kapijaPartsMat2")
                  kapijaParts2Cart += 1;
                if (kapijaPartsArr[i].material.name == "kapijaPartsMat3")
                  kapijaParts3Cart += 1;
              }
              // if (allFences[i][2].isVisible || allFences[i][3].isVisible)
              //   fionaKosaRupeLarcheCart += 1;
              // if (allFences[i][4].isVisible) fiona180180LarcheCart += 1;
              // if (allFences[i][5].isVisible) fiona90180LarcheCart += 1;
              // if (allFences[i][6].isVisible || allFences[i][7].isVisible)
              //   fionaKosaLarcheCart += 1;

              // }
              // if (fencesArr[i].color == "grun") {
              //   if (allFences[i][0].isVisible) mail180180GrunCart += 1;
              //   if (allFences[i][1].isVisible) mail90180GrunCart += 1;
              //   if (allFences[i][2].isVisible) mail18090GrunCart += 1;
              //   if (allFences[i][3].isVisible || allFences[i][4].isVisible)
              //     mailKosaGrunCart += 1;
              //   if (allFences[i][5].isVisible) mail180180KrivaGrunCart += 1;
              //   if (allFences[i][6].isVisible || allFences[i][7].isVisible)
              //     mailKosaKrivaGrunCart += 1;
              // }
            }
            //populate wooden posts
            let woodenPost190Larche = 0;
            // let woodenPost95Larche = 0;

            for (let i = 0; i < allWoodPosts.length; i++) {
              if (allWoodPosts[i].isVisible) {
                if (allWoodPosts[i].scaling.y > 0.999) {
                  // if (allWoodPosts[i].material.name == "Wood-Velja")
                  woodenPost190Larche += 1;
                  // if (allWoodPosts[i].material.name != "Wood-Velja")
                  //   woodenPost190Grau += 1;
                }
                // if (allWoodPosts[i].scaling.y < 1) {
                //   // if (allWoodPosts[i].material.name == "Wood-Velja")
                //   woodenPost95Larche += 1;
                //   // if (allWoodPosts[i].material.name != "Wood-Velja")
                //   //   woodenPost95Grau += 1;
                // }
              }
            }

            // //populate alu posts
            let post295SilberCart = 0;
            let post235SilberCart = 0;
            let post190SilberCart = 0;
            let post150SilberCart = 0;
            let post100SilberCart = 0;

            let post235AnthCart = 0;
            let post190AnthCart = 0;
            let post150AnthCart = 0;

            for (let i = 0; i < allPosts.length; i++) {
              if (allPosts[i].isVisible) {
                // if (allPosts[i].scaling.x == 1) {
                if (allPosts[i].material.diffuseColor.r > 0.3) {
                  if (allPosts[i].scaling.z == 1.475) {
                    post295SilberCart += 1;
                  }
                  if (allPosts[i].scaling.z == 1.2) {
                    post235SilberCart += 1;
                  }
                  if (
                    allPosts[i].scaling.z == 1 ||
                    allPosts[i].scaling.z == 0.999
                  ) {
                    post190SilberCart += 1;
                  }
                  if (allPosts[i].scaling.z == 0.724) {
                    post150SilberCart += 1;
                  }
                  if (allPosts[i].scaling.z == 0.524) {
                    post100SilberCart += 1;
                  }
                } else {
                  if (allPosts[i].scaling.z == 1.2) {
                    post235AnthCart += 1;
                  }
                  if (
                    allPosts[i].scaling.z == 1 ||
                    allPosts[i].scaling.z == 0.999
                  ) {
                    post190AnthCart += 1;
                  }
                  if (allPosts[i].scaling.z == 0.724) {
                    post150AnthCart += 1;
                  }
                }
                // }
              }
            }
            // // poulate roots
            let rootsCart = 0;
            // if (roots[0].isVisible) rootsCart += 1;
            // if (roots[2].isVisible) rootsCart += 1;
            for (let i = 0; i < roots.length; i++) {
              if (roots[i].isVisible) rootsCart += 1;
            }

            //populate sturmanker
            let sturmankerSilberCart = 0;
            let sturmankerAnthCart = 0;
            for (let i = 0; i < sturmankersRuckseite.length; i++) {
              if (
                sturmankersRuckseite[i].isVisible ||
                sturmankersVorderseite[i].isVisible
              ) {
                if (sturmankersRuckseite[i].material.diffuseColor.r > 0.3) {
                  sturmankerSilberCart += 1;
                } else {
                  sturmankerAnthCart += 1;
                }
              }
            }
            // populate metal anchors
            let metalPartsCart = 0;
            let screwsCart = 0;
            metalParts.forEach((elm) => {
              if (elm.isVisible) {
                metalPartsCart += 1;
                screwsCart += 4;
              }
            });
            //populate L-profiles
            let lProfilesCart = 0;
            allLprofilesComb.forEach((elm) => {
              if (elm.isVisible) lProfilesCart += 1;
            });
            //cart items
            cartItems = [];
            cartItems
              .push
              // rhombus180180LarcheCart,
              // rhombus90180LarcheCart,
              // rhombus60180LarcheCart,
              // rhombus150180LarcheCart,
              // raRhombus60180LarcheCart,
              // raRhombus50180LarcheCart,
              // kapijaCart,
              // kapijaParts1Cart,
              // kapijaParts2Cart,
              // kapijaParts3Cart,
              // woodenPost190Larche,
              // sturmankerSilberCart,
              // sturmankerAnthCart,
              // post295SilberCart,
              // post235SilberCart,
              // post190SilberCart,
              // post150SilberCart,
              // post100SilberCart,
              // post235AnthCart,
              // post190AnthCart,
              // post150AnthCart,
              // rootsCart,
              // metalPartsCart,
              // screwsCart,
              // lProfilesCart
              ();
            mrk();
          }
        };

        //CLOSE CART
        cartCloseBtn.onclick = () => {
          cartFade.style.display = "none";
          cartMainSection.style.display = "none";
        };
        cartFade.onclick = () => {
          cartMainSection.style.display = "none";
          cartFade.style.display = "none";
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Display message
        function showMessage(msg, elm) {
          var elmMessage = $("<div></div>").addClass("scMessageBar").hide();
          elmMessage.html(msg);
          if (elm) {
            elm.append(elmMessage);
            elmMessage.show();
          }
        }

        function showHighlightMessage(msg) {
          msgBox2.html(msg);
          msgBox2.fadeIn("fast", function () {
            setTimeout(function () {
              msgBox2.fadeOut("fast");
            }, 1000);
          });
        }

        // Show Image tooltip
        function showTooltip(img) {
          var height = img.height();
          var width = img.height();
          var imgOffsetTop = img.offset().top;
          jQuery.log(img.offset());
          jQuery.log(img.position());
          jQuery.log("--------------");
          tooltip.html("");
          var tImage = $("<img alt=''></img>").attr("src", $(img).attr("src"));
          tImage.height(toolMaxImageHeight);
          tooltip.append(tImage);
          var top = imgOffsetTop - height;
          var left = width + 10;
          tooltip.css({ top: top, left: left });
          tooltip.show("fast");
        }

        function validateNumber(num) {
          var ret = false;
          if (num) {
            num = num - 0;
            if (num && num > 0) {
              ret = true;
            }
          }
          return ret;
        }

        // Get the money formatted for display
        function getMoneyFormatted(val) {
          var priceFormat = val.toFixed(2);

          if (priceFormat > 1000) {
            var tmp = priceFormat / 1000;
            tmp = Math.floor(tmp);
            priceFormat = priceFormat - tmp * 1000;
            priceFormat = priceFormat.toFixed(2);

            if (priceFormat < 10) {
              priceFormat = "00" + String(priceFormat);
            } else if (priceFormat < 100) {
              priceFormat = "0" + String(priceFormat);
            }

            priceFormat = String(tmp) + ";" + String(priceFormat);
          }

          priceFormat = priceFormat.replace(".", ",");
          priceFormat = priceFormat.replace(";", ".");
          return priceFormat;
        }

        // Trims the blankspace
        function trim(s) {
          var l = 0;
          var r = s.length - 1;
          while (l < s.length && s[l] == " ") {
            l++;
          }
          while (r > l && s[r] == " ") {
            r -= 1;
          }
          return s.substring(l, r + 1);
        }
        // format the product template
        function formatTemplate(str, objItem) {
          resStr = str.split("<%=");
          var finalStr = "";
          for (i = 0; i < resStr.length; i++) {
            var tmpStr = resStr[i];
            valRef = tmpStr.substring(0, tmpStr.indexOf("%>"));
            if (valRef != "" || valRef != null) {
              var valRep = objItem.attr(valRef); //n[valRef];
              if (valRep == null || valRep == "undefined") {
                valRep = "";
              }
              tmpStr = tmpStr.replace(valRef + "%>", valRep);
              finalStr += tmpStr;
            } else {
              finalStr += tmpStr;
            }
          }
          return finalStr;
        }
      });
    };

    // Default options
    $.fn.smartCart.defaults = {
      selected: 1, // 0 = produts list, 1 = cart
      resultName: "products_selected[]",
      enableImage: true,
      enableImageTooltip: false,
      enableSearch: false,
      enableCategoryFilter: true,
      productItemTemplate:
        "<small>Art. <%=pid%></small><br /><strong><%=pname%></strong><br /><small><%=pabm%></small><br /><small>Preis: <strong><%=fprice%> </strong></small>",
      cartItemTemplate:
        "<small>Art. <%=pid%></small><br /><strong><%=pname%></strong><br /><small><%=pabm%></small>",
      // Events
      onAdd: null, // function(pObj,quantity){ return true; }
      onAdded: null, // function(pObj,quantity){ }
      onRemove: null, // function(pObj){return true;}
      onRemoved: null, // function(pObj){ }
      onUpdate: null, // function(pObj,quantity){ return true; }
      onUpdated: null, // function(pObj,quantity){ }
      onCheckout: null, // function(Obj){ }
    };

    jQuery.log = function (message) {
      if (window.console) {
        console.debug(message);
      }
    };
  })(jQuery, this);
  ////////////////////////
  //POPULATE CART PRICES
  let cartPricesLoaded = [false];
  populateCartPrices(cartPricesLoaded);
  function checkLoaded() {
    if (cartPricesLoaded[0]) {
      $("#SmartCart").smartCart();
      $("#SmartCart").css("visibility", "visible");
      $(document).foundation();
      clearInterval(refreshIntervalId);
      console.log("cart loaded");
    } else {
      console.log("cart not loaded");
    }
  }
  if (!cartPricesLoaded[0]) {
    var refreshIntervalId = setInterval(checkLoaded, 100);
  }
}

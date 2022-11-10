function intersectionInsideFunction(
  fakeFronts,
  fakeFences,
  sturmankersVorderseite,
  fakeBacks,
  sturmankersRuckseite,
  foundationStarts,
  foundations,
  foundationStartsVord,
  foundationsVord,
  foundationStartsRuck,
  foundationsRuck,
  metalParts,
  smallMetalParts,
  postType,
  allWoodPosts
) {
  for (let i = 0; i < fakeFronts.length; i++) {
    let checkIntersectionOnBoth = [false, false];
    fakeFences.forEach((elm) => {
      if (elm.name == "fakeFence") {
        if (elm.intersectsMesh(fakeFronts[i], true)) {
          sturmankersVorderseite[i].isVisible = false;
          sturmankersRuckseite[i].isVisible = false;
          if (postType == 0 && allWoodPosts[i].isVisible) {
            metalParts[i].isVisible = false;
            smallMetalParts[i][0].isVisible = true;
            smallMetalParts[i][1].isVisible = false;
            smallMetalParts[i][2].isVisible = false;
            checkIntersectionOnBoth[0] = true;
          }
          foundationVisibilty(
            foundationStarts,
            foundations,
            true,
            foundationStartsVord,
            foundationsVord,
            false,
            foundationStartsRuck,
            foundationsRuck,
            false,
            i
          );
        }
        if (elm.intersectsMesh(fakeBacks[i], true)) {
          sturmankersVorderseite[i].isVisible = false;
          sturmankersRuckseite[i].isVisible = false;
          if (postType == 0 && allWoodPosts[i].isVisible) {
            metalParts[i].isVisible = false;
            smallMetalParts[i][0].isVisible = false;
            smallMetalParts[i][1].isVisible = true;
            smallMetalParts[i][2].isVisible = false;
            checkIntersectionOnBoth[1] = true;
          }
          foundationVisibilty(
            foundationStarts,
            foundations,
            true,
            foundationStartsVord,
            foundationsVord,
            false,
            foundationStartsRuck,
            foundationsRuck,
            false,
            i
          );
        }
        if (postType == 0 && allWoodPosts[i].isVisible) {
          if (checkIntersectionOnBoth[0] && checkIntersectionOnBoth[1]) {
            smallMetalParts[i][0].isVisible = false;
            smallMetalParts[i][1].isVisible = false;
            smallMetalParts[i][2].isVisible = true;
          } else if (
            !checkIntersectionOnBoth[0] &&
            !checkIntersectionOnBoth[1]
          ) {
            smallMetalParts[i][0].isVisible = false;
            smallMetalParts[i][1].isVisible = false;
            smallMetalParts[i][2].isVisible = false;
            metalParts[i].isVisible = true;
          }
        }
      }
    });
  }
}

function intersectionFunction(
  fakeFronts,
  fakeFences,
  sturmankersVorderseite,
  fakeBacks,
  sturmankersRuckseite,
  foundationStarts,
  foundations,
  foundationStartsVord,
  foundationsVord,
  foundationStartsRuck,
  foundationsRuck,
  metalParts,
  smallMetalParts,
  postType,
  allWoodPosts
) {
  setTimeout(() => {
    intersectionInsideFunction(
      fakeFronts,
      fakeFences,
      sturmankersVorderseite,
      fakeBacks,
      sturmankersRuckseite,
      foundationStarts,
      foundations,
      foundationStartsVord,
      foundationsVord,
      foundationStartsRuck,
      foundationsRuck,
      metalParts,
      smallMetalParts,
      postType,
      allWoodPosts
    );
  }, 0);
  setTimeout(() => {
    intersectionInsideFunction(
      fakeFronts,
      fakeFences,
      sturmankersVorderseite,
      fakeBacks,
      sturmankersRuckseite,
      foundationStarts,
      foundations,
      foundationStartsVord,
      foundationsVord,
      foundationStartsRuck,
      foundationsRuck,
      metalParts,
      smallMetalParts,
      postType,
      allWoodPosts
    );
  }, 100);
  setTimeout(() => {
    intersectionInsideFunction(
      fakeFronts,
      fakeFences,
      sturmankersVorderseite,
      fakeBacks,
      sturmankersRuckseite,
      foundationStarts,
      foundations,
      foundationStartsVord,
      foundationsVord,
      foundationStartsRuck,
      foundationsRuck,
      metalParts,
      smallMetalParts,
      postType,
      allWoodPosts
    );
  }, 200);
}

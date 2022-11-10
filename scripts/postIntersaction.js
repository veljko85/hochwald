function checkIntPos(
  fakePosts,
  allPosts,
  allWoodPosts,
  rightRoots,
  rightMetalParts,
  intersectedPosts,
  intersectedPostsMain,
  fencesArr,
  postType,
  smallMetalParts
) {
  // console.log(postType);
  for (let i = 0; i < fakePosts.length; i++) {
    for (let j = i; j < fakePosts.length; j++) {
      if (i != j) {
        if (fakePosts[i].intersectsMesh(fakePosts[j], false)) {
          if (
            (allPosts[i].isVisible && allPosts[j].isVisible) ||
            (allWoodPosts[i].isVisible && allWoodPosts[j].isVisible)
          ) {
            // rightPostCaps[j - 1].isVisible = false;
            allPosts[j].isVisible = false;
            allWoodPosts[j].isVisible = false;
            rightRoots[j - 1].isVisible = false;
            rightMetalParts[j - 1].isVisible = false;
            smallMetalParts[j].forEach((elm) => {
              elm.isVisible = false;
            });
            intersectedPostsMain.push(i);
            intersectedPosts.push(j);
          }
        }
      }
    }
  }
  if (intersectedPostsMain.length > 0) {
    for (let i = 0; i < intersectedPostsMain.length; i++) {
      if (
        fakePosts[intersectedPostsMain[i]].intersectsMesh(
          fakePosts[intersectedPosts[i]],
          false
        )
      ) {
        if (postType == 1) {
          // rightPostCaps[intersectedPosts[i] - 1].isVisible = false;
          allPosts[intersectedPosts[i]].isVisible = false;
          rightRoots[intersectedPosts[i] - 1].isVisible = false;
        }
        if (postType == 0) {
          allWoodPosts[intersectedPosts[i]].isVisible = false;
          rightMetalParts[intersectedPosts[i] - 1].isVisible = false;
        }
        if (
          intersectedPostsMain[i] > 0 &&
          fencesArr[intersectedPostsMain[i] - 1].status != "activeFence"
        ) {
          if (postType == 1) {
            // rightPostCaps[intersectedPosts[i] - 1].isVisible = true;
            allPosts[intersectedPosts[i]].isVisible = true;
            if (
              allPosts[intersectedPosts[i]].scaling.z == 1 ||
              allPosts[intersectedPosts[i]].scaling.z == 0.524
            )
              rightRoots[intersectedPosts[i] - 1].isVisible = true;
          }
          if (postType == 0) {
            allWoodPosts[intersectedPosts[i]].isVisible = true;
            rightMetalParts[intersectedPosts[i] - 1].isVisible = true;
          }
          intersectedPostsMain.splice(i, 1);
          intersectedPosts.splice(i, 1);
        }
      } else {
        if (postType == 1) {
          // rightPostCaps[intersectedPosts[i] - 1].isVisible = true;
          allPosts[intersectedPosts[i]].isVisible = true;
          if (
            allPosts[intersectedPosts[i]].scaling.z == 1 ||
            allPosts[intersectedPosts[i]].scaling.z == 0.524
          )
            rightRoots[intersectedPosts[i] - 1].isVisible = true;
        }
        if (postType == 0) {
          allWoodPosts[intersectedPosts[i]].isVisible = true;
          rightMetalParts[intersectedPosts[i] - 1].isVisible = true;
        }
        intersectedPostsMain.splice(i, 1);
        intersectedPosts.splice(i, 1);
      }
    }
  }
}
var checkPostIntersecting = (
  fakePosts,
  allPosts,
  allWoodPosts,
  rightRoots,
  rightMetalParts,
  intersectedPosts,
  intersectedPostsMain,
  fencesArr,
  postType,
  smallMetalParts
) => {
  setTimeout(() => {
    checkIntPos(
      fakePosts,
      allPosts,
      allWoodPosts,
      rightRoots,
      rightMetalParts,
      intersectedPosts,
      intersectedPostsMain,
      fencesArr,
      postType,
      smallMetalParts
    );
  }, 0);
  setTimeout(() => {
    checkIntPos(
      fakePosts,
      allPosts,
      allWoodPosts,
      rightRoots,
      rightMetalParts,
      intersectedPosts,
      intersectedPostsMain,
      fencesArr,
      postType,
      smallMetalParts
    );
  }, 100);
  setTimeout(() => {
    checkIntPos(
      fakePosts,
      allPosts,
      allWoodPosts,
      rightRoots,
      rightMetalParts,
      intersectedPosts,
      intersectedPostsMain,
      fencesArr,
      postType,
      smallMetalParts
    );
  }, 200);
};

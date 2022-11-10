function createNewFence(
  createRightFence,
  activeArrowSide,
  rightPosts,
  rightWoodPosts,
  leftPosts,
  allWoodPosts,
  activeArrow,
  fencePostMat,
  addFenceSings,
  addNewFenceMeshMat,
  sideAccesories,
  addNewFenceToSide,
  unselect,
  fenceType,
  getAbsPosX,
  getAbsPosZ
) {
  if (activeArrowSide == 1) {
    if (rightPosts[0].isVisible) {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]) + 0.97,
        getAbsPosZ(rightPosts[activeArrow]),
        0,
        fenceType
      );
    } else {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]) + 0.99,
        getAbsPosZ(rightPosts[activeArrow]),
        0,
        fenceType
      );
    }
  }
  if (activeArrowSide == 2) {
    if (rightPosts[0].isVisible) {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]),
        getAbsPosZ(rightPosts[activeArrow]) - 0.97,
        Math.PI / 2,
        fenceType
      );
    } else {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]),
        getAbsPosZ(rightPosts[activeArrow]) - 0.99,
        Math.PI / 2,
        fenceType
      );
    }
  }
  if (activeArrowSide == 3) {
    if (rightPosts[0].isVisible) {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]),
        getAbsPosZ(rightPosts[activeArrow]) + 0.97,
        -Math.PI / 2,
        fenceType
      );
    } else {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]),
        getAbsPosZ(rightPosts[activeArrow]) + 0.99,
        -Math.PI / 2,
        fenceType
      );
    }
  }
  if (activeArrowSide == 4) {
    if (rightPosts[0].isVisible) {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]) - 0.97,
        getAbsPosZ(rightPosts[activeArrow]),
        Math.PI,
        fenceType
      );
    } else {
      createRightFence(
        getAbsPosX(rightPosts[activeArrow]) - 0.99,
        getAbsPosZ(rightPosts[activeArrow]),
        Math.PI,
        fenceType
      );
    }
  }
  if (activeArrowSide == 5) {
    if (rightPosts[0].isVisible) {
      createRightFence(
        getAbsPosX(leftPosts[0]),
        getAbsPosZ(leftPosts[0]) - 0.97,
        Math.PI / 2,
        fenceType
      );
    } else {
      createRightFence(
        getAbsPosX(allWoodPosts[0]),
        getAbsPosZ(allWoodPosts[0]) - 0.99,
        Math.PI / 2,
        fenceType
      );
    }
  }
  if (activeArrowSide == 6) {
    if (rightPosts[0].isVisible) {
      createRightFence(
        getAbsPosX(leftPosts[0]),
        getAbsPosZ(leftPosts[0]) + 0.97,
        -Math.PI / 2,
        fenceType
      );
    } else {
      createRightFence(
        getAbsPosX(allWoodPosts[0]),
        getAbsPosZ(allWoodPosts[0]) + 0.99,
        -Math.PI / 2,
        fenceType
      );
    }
  }

  if (activeArrow != false) rightPosts[activeArrow].material = fencePostMat;

  activeArrow = false;
  activeArrowSide = false;
  addFenceSings.forEach((elm) => {
    elm.material = addNewFenceMeshMat;
  });
  sideAccesories.style.display = "none";
  addNewFenceToSide.style.display = "none";
  // newFenceInlays.style.display = "none";
  // newStub.style.display = "none";

  unselect(false);

  // singsDel.forEach((elm) => {
  //   elm.isVisible = false;
  // });
}

function setSmallerFenceSize(
  rightPost,
  rightPostCap,
  foundationRight,
  newFenceForwardSigns,
  newFenceRightSigns,
  newFenceLeftSigns,
  newFenceBackSigns,
  getAbsPosX,
  getAbsPosZ,
  fakeFence,
  rightWoodPost,
  size
) {
  rightPost.position.x = rightWoodPost.position.x = rightPost.position.x - size;
  rightPostCap.position.x = rightPostCap.position.x - size;

  if (size == 0.3) {
    fakeFence.scaling.x = 0.833;
    fakeFence.position.x = 0.15;
  }
  if (size == 0.6) {
    fakeFence.scaling.x = 0.68;
    fakeFence.position.x = 0.3;
  }
  if (size == 0.8) {
    fakeFence.scaling.x = 0.55;
    fakeFence.position.x = 0.4;
  }
  if (size == 0.9) {
    fakeFence.scaling.x = 0.5;
    fakeFence.position.x = 0.45;
  }
  if (size == 1.2) {
    fakeFence.scaling.x = 0.35;
    fakeFence.position.x = 0.6;
  }
  if (size == 1.3) {
    fakeFence.scaling.x = 0.2;
    fakeFence.position.x = 0.65;
  }

  // foundationRight.position.x = getAbsPosX;
  // foundationRight.setAbsolutePosition(
  //   new BABYLON.Vector3(
  //     getAbsPosX(rightPost),
  //     foundationRight.position.y,
  //     getAbsPosZ(rightPost)
  //   )
  // );

  newFenceForwardSigns[newFenceForwardSigns.length - 1].setAbsolutePosition(
    new BABYLON.Vector3(
      getAbsPosX(rightPost) + 0.3,
      newFenceForwardSigns[newFenceForwardSigns.length - 1].position.y,
      getAbsPosZ(rightPost)
    )
  );

  newFenceRightSigns[newFenceRightSigns.length - 1].setAbsolutePosition(
    new BABYLON.Vector3(
      getAbsPosX(rightPost),
      newFenceRightSigns[newFenceRightSigns.length - 1].position.y,
      getAbsPosZ(rightPost) - 0.3
    )
  );

  newFenceLeftSigns[newFenceLeftSigns.length - 1].setAbsolutePosition(
    new BABYLON.Vector3(
      getAbsPosX(rightPost),
      newFenceLeftSigns[newFenceLeftSigns.length - 1].position.y,
      getAbsPosZ(rightPost) + 0.3
    )
  );

  newFenceBackSigns[newFenceBackSigns.length - 1].setAbsolutePosition(
    new BABYLON.Vector3(
      getAbsPosX(rightPost) - 0.3,
      newFenceBackSigns[newFenceBackSigns.length - 1].position.y,
      getAbsPosZ(rightPost)
    )
  );
}

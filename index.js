//HEADING MENU
//videos
var videosBut = document.getElementById("videos-but");
var modalVideos = document.getElementById("modal-videos");
videosBut.onclick = () => {
  modalFade.style.display = "block";
  modalVideos.style.display = "block";
};
var modalVideosParts = document.getElementsByClassName("modal-videos-part");
var modalVideo = document.getElementById("modal-video");
var modalVideoVideo = document.getElementById("modal-video-video");
for (let i = 0; i < modalVideosParts.length; i++) {
  modalVideosParts[i].addEventListener("click", () => {
    modalVideos.style.display = "none";
    modalVideo.style.display = "block";
    modalVideoVideo.setAttribute("src", `videos/${i}.webm`);
  });
}

//MODAL SECTION FADE
let modalFade = document.getElementById("modal-fade");
let modalContent = document.getElementsByClassName("modal-content");
let onSturmanker = document.getElementById("on-sturmanker");
let modalCloseBtn = document.getElementsByClassName("modal-close-btn");
let modalVerSchBtn = document.getElementsByClassName("modal-ver-sch-btn");
let onLedSturmanker = document.getElementById("on-led-sturmanker");
let ledSturBtn = document.getElementById("ledStur-btn");
let sturLedBtn = document.getElementById("sturLed-btn");

for (let i = 0; i < modalCloseBtn.length; i++) {
  modalCloseBtn[i].addEventListener("click", () => {
    modalFade.style.display = "none";
    for (let i = 0; i < modalContent.length; i++) {
      modalContent[i].style.display = "none";
    }
  });
}
for (let i = 0; i < modalVerSchBtn.length; i++) {
  modalVerSchBtn[i].addEventListener("click", () => {
    modalFade.style.display = "none";
    for (let i = 0; i < modalContent.length; i++) {
      modalContent[i].style.display = "none";
    }
  });
}

// // // ACCESORIES SECTION*****************************************************************************************
let sideAccesories = document.getElementById("side-accesories");
let deleteImgAccesories = document.getElementsByClassName(
  "delete-img-accesories"
);
let deleteAccesorie = document.getElementsByClassName("del-acc");
let sideAccCloseBtn = document.getElementsByClassName(
  "side-accesories-close-btn"
);
let addFenceAcc = document.getElementById("add-fence-acc");
let addNewFenceToSide = document.getElementById("addNewFenceToSide");

//ADD FENCE
//add fence activnes

// //CANVAS********************************************************************************************************************
var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

//FOR LOADING
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (document.getElementById("customLoadingScreenDiv")) {
    // Do not add a loading screen if there is already one
    document.getElementById("customLoadingScreenDiv").style.display = "initial";
    return;
  }
};
//lottie
let animItem = bodymovin.loadAnimation({
  wrapper: document.getElementById("lottieWraper"),
  animType: "svg",
  loop: true,
  // rendererSettings: {
  //   progressiveLoad: false,
  //   preserveAspectRatio: "xMidYMid meet",
  //   viewBoxSize: "10 10 10 10",
  // },
  path: "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/loading.json",
});
animItem.resize();
animItem.addEventListener("DOMLoaded", function () {
  animItem.playSegments(
    [
      [0, 100],
      [32, 100],
    ],
    true
  );
});

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
  document.getElementById("customLoadingScreenDiv").style.display = "none";
  // console.log("scene is now loaded");
};
//end of loading

//CREATE SCENE ///////////////////////////////////////////////////
var createScene = function () {
  // for loading
  engine.displayLoadingUI();

  // SCENE
  var scene = new BABYLON.Scene(engine);

  //CAMERA
  var cameraTarget = new BABYLON.MeshBuilder.CreateBox(
    "cameraTarget",
    { width: 0.2, height: 0.2, depth: 0.2 },
    scene
  );
  cameraTarget.position = new BABYLON.Vector3(0.9, 1, 0);
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  cameraTarget.isVisible = false;
  // var camera = new BABYLON.FreeCamera(
  //   "camera1",
  //   new BABYLON.Vector3(0, 5, -10),
  //   scene
  // );
  camera.attachControl(canvas, true);
  camera.setPosition(new BABYLON.Vector3(0.9, 1.5, -4.1));
  // camera.setTarget(new BABYLON.Vector3(0.9, 1, 0));
  camera.wheelPrecision = 300;
  camera.target = cameraTarget;

  camera.lowerRadiusLimit = 2;
  // camera.upperRadiusLimit = 50;

  // camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = 1.9;

  // // ENVIROMENT
  // scene.environmentTexture = new BABYLON.CubeTexture(
  //   "enviorment/env.env",
  //   scene
  // );
  // scene.environmentIntensity = 0.8;

  //LIGHTS
  let lights = [];
  let lightsLite = [];
  let lightsHavy = [];
  // let lightsLed = [];
  let lightColors = [
    "#ff0000",
    "#198754",
    "#ffc107",
    "#0d6efd",
    "#ffffff",
    "#0dcaf0",
    "#f70767",
    "#ff7400",
    "#7B00F7",
    "#7C7C02",
  ];
  lightsBabylon(lightsLite, lightsHavy, lights);
  //set lights color
  lights.forEach((elm) => {
    elm.diffuse = elm.specular = BABYLON.Color3.FromHexString(lightColors[4]);
  });

  //SKY
  var skyBoxes = [];
  addSkyBox(skyBoxes);

  // GROUND
  // createGround();
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 1, height: 1 },
    scene
  );
  ground.scaling.x = 2.3;
  ground.scaling.z = 0.5;
  ground.position = new BABYLON.Vector3(0.9, 0, 0);
  var grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);
  grassMaterial.diffuseTexture = new BABYLON.Texture("img/grass.jpg", scene);
  grassMaterial.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  grassMaterial.diffuseTexture.uScale = 4.6; // width / height
  grassMaterial.diffuseTexture.vScale = 1;
  ground.material = grassMaterial;
  ////////////////////////////////////////////////
  function groundChange(x, z) {
    ground.scaling.x = x;
    ground.scaling.z = z;

    // ground.position = new BABYLON.Vector3(0.9, 0, -0.9);
  }

  //SET TEXTURE FOR SHOWING SIZE
  //gound text X
  var groundTextX = BABYLON.MeshBuilder.CreateGround(
    "groundTextX",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  var groundTextX2 = BABYLON.MeshBuilder.CreateGround(
    "groundTextX",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  groundTextX2.rotation.y = Math.PI;
  //Create dynamic texture
  // var textureResolution = 512;
  var textureGroundX = new BABYLON.DynamicTexture(
    "dynamic texture",
    { width: 512, height: 256 },
    scene
  );
  var textureContextX = textureGroundX.getContext();

  var materialGroundX = new BABYLON.StandardMaterial("Mat", scene);
  materialGroundX.diffuseTexture = textureGroundX;
  materialGroundX.diffuseTexture.hasAlpha = true;
  groundTextX.material = materialGroundX;
  groundTextX2.material = materialGroundX;
  textX = 191;
  //Add text to dynamic texture
  var font = "120px Arial";
  textureGroundX.drawText(
    textX + "cm",
    null,
    null,
    font,
    "black",
    "transparent",
    true,
    true
  );

  //gound text Z
  var groundTextZ = BABYLON.MeshBuilder.CreateGround(
    "groundTextZ",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  groundTextZ.rotation.y = Math.PI / 2;
  var groundTextZ2 = BABYLON.MeshBuilder.CreateGround(
    "groundTextZ",
    { width: 1, height: 0.5, subdivisions: 25 },
    scene
  );
  groundTextZ2.rotation.y = -Math.PI / 2;
  //Create dynamic texture

  var textureGroundZ = new BABYLON.DynamicTexture(
    "dynamic texture",
    { width: 512, height: 256 },
    scene
  );
  var textureContextZ = textureGroundZ.getContext();

  var materialGroundZ = new BABYLON.StandardMaterial("Mat", scene);
  materialGroundZ.diffuseTexture = textureGroundZ;
  materialGroundZ.diffuseTexture.hasAlpha = true;
  groundTextZ.material = materialGroundZ;
  groundTextZ2.material = materialGroundZ;
  textZ = 7;
  //Add text to dynamic texture
  // var font = "120px Arial";
  textureGroundZ.drawText(
    textZ + "cm",
    null,
    null,
    font,
    "black",
    "transparent",
    true,
    true
  );

  //   //   /////////////////////////////////////////////////////////////////////////////////////////

  //FENCE COLORS
  // fenceBoardsColors = ["#8c8c8c", "#474747", "#836953", "#ece6d6"];
  fencePartsColors = ["#e6e6e6", "#474747"];

  // //FENCE POSTS MATERIAL
  var fencePostMat = new BABYLON.StandardMaterial("fencePostMat", scene);
  fencePostMat.diffuseColor = BABYLON.Color3.FromHexString(fencePartsColors[1]);

  // //FENCE POSTS MATERIAL
  var sturmankerMat = new BABYLON.StandardMaterial("sturmankerMat", scene);
  sturmankerMat.diffuseColor = BABYLON.Color3.FromHexString(
    fencePartsColors[1]
  );

  //FENCE POST CAP MATERIALS
  var capMat = new BABYLON.StandardMaterial("capMat", scene);
  capMat.diffuseColor = BABYLON.Color3.FromHexString("#202020");
  capMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  //ROOT SRAF MATERIAL
  var rootMat = new BABYLON.StandardMaterial("rootMat", scene);
  rootMat.diffuseColor = BABYLON.Color3.FromHexString("#b4b4b4");
  // rootMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);

  //CONCRETE MATERIAL
  let concreteMat = new BABYLON.StandardMaterial("concreteMat", scene);
  concreteMat.diffuseTexture = new BABYLON.Texture("img/concrete.jpg", scene);
  concreteMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  concreteMat.backFaceCulling = false;

  //FOUNDATION MATERIAL
  var foundationMat = new BABYLON.StandardMaterial("foundationMat", scene);
  foundationMat.diffuseColor = BABYLON.Color3.FromHexString("#ffffff");
  foundationMat.alpha = 0.5;

  //ADD NEW FENCE SING MATERIAL
  const addNewFenceMeshMat = new BABYLON.StandardMaterial("addNewFenceMeshMat");
  addNewFenceMeshMat.diffuseTexture = new BABYLON.Texture("img/arrow.png");
  addNewFenceMeshMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  // addNewFenceMeshMat.diffuseColor = new BABYLON.Vector4(1,0,0,1);
  addNewFenceMeshMat.backFaceCulling = false;

  const addNewFenceMeshMatAct = new BABYLON.StandardMaterial(
    "addNewFenceMeshMatAct"
  );
  addNewFenceMeshMatAct.diffuseTexture = new BABYLON.Texture(
    "img/arrowActive.png"
  );
  addNewFenceMeshMatAct.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  // addNewFenceMeshMat.diffuseColor = new BABYLON.Vector4(1,0,0,1);
  addNewFenceMeshMatAct.backFaceCulling = false;

  //KAPIJA PARTS MATERIALS
  var kapijaPartsMat1 = new BABYLON.StandardMaterial("kapijaPartsMat1", scene);
  kapijaPartsMat1.diffuseColor = BABYLON.Color3.FromHexString("#343434");
  // kapijaPartsMat1.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  var kapijaPartsMat2 = new BABYLON.StandardMaterial("kapijaPartsMat2", scene);
  kapijaPartsMat2.diffuseColor = BABYLON.Color3.FromHexString("#7c2b1f");
  // kapijaPartsMat2.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  var kapijaPartsMat3 = new BABYLON.StandardMaterial("kapijaPartsMat3", scene);
  kapijaPartsMat3.diffuseColor = BABYLON.Color3.FromHexString("#9c8465");
  // kapijaPartsMat3.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

  //MATERIAL FOR SELECTION
  var selectedMat = new BABYLON.StandardMaterial("selectedMat", scene);
  selectedMat.diffuseColor = BABYLON.Color3.FromHexString("#C10000");
  selectedMat.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);

  // //POST MATERIAL GRUN 1
  // var postGrunMaterial = new BABYLON.StandardMaterial(
  //   "postGrunMaterial",
  //   scene
  // );
  // postGrunMaterial.diffuseTexture = new BABYLON.Texture(
  //   "textures/grun.jpg",
  //   scene
  // );
  // postGrunMaterial.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  // postGrunMaterial.diffuseTexture.uScale = 1; // width
  // postGrunMaterial.diffuseTexture.vScale = 1; // height

  //POST MATERIAL LARCHE 2
  var postLarcheMaterial = new BABYLON.StandardMaterial(
    "postLarcheMaterial",
    scene
  );
  postLarcheMaterial.diffuseTexture = new BABYLON.Texture(
    "textures/larche4.jpg",
    scene
  );
  postLarcheMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  postLarcheMaterial.diffuseTexture.uScale = 2; // width
  postLarcheMaterial.diffuseTexture.vScale = 2; // height

  var postWoodMaterials = [];
  // postWoodMaterials[0] = postGrunMaterial;
  postWoodMaterials[0] = postLarcheMaterial;

  // //MATERIAL GRUN 1
  // var grunMaterial = new BABYLON.StandardMaterial("grunMaterial", scene);
  // grunMaterial.diffuseTexture = new BABYLON.Texture("textures/grun.jpg", scene);
  // grunMaterial.specularColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  // grunMaterial.diffuseTexture.uScale = 4; // width
  // grunMaterial.diffuseTexture.vScale = 4; // height

  //MATERIAL LARCHE 2
  var larcheMaterial = new BABYLON.StandardMaterial("larcheMaterial", scene);
  larcheMaterial.diffuseTexture = new BABYLON.Texture(
    "textures/larche5.jpg",
    scene
  );
  larcheMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  larcheMaterial.diffuseTexture.uScale = 4; // width
  larcheMaterial.diffuseTexture.vScale = 4; // height

  var woodMaterials = [];
  // woodMaterials[0] = grunMaterial;
  woodMaterials[0] = larcheMaterial;

  woodMaterials.forEach((elm) => {
    elm.ambientTexture = new BABYLON.Texture("textures/bake2.jpg", scene);
    elm.ambientTexture.uScale = 1; //and/or the following for vScale:
    elm.ambientTexture.vScale = -1; //(-1.0 or some other value)
  });

  //   //   //FENCE VARIABLES
  var leftPostCaps = [];
  var leftPostCapClones = [];
  var rightPostCaps = [];
  var rightPostCapClones = [];
  var metalParts = [];
  var rightMetalParts = [];
  var smallMetalParts = [];
  var rightSmallMetalParts = [];
  var allWoodPosts = [];
  var rightWoodPosts = [];
  // var woodMaterials = [];
  var leftPosts = [];
  var rightPosts = [];
  var allPosts = [];
  var fakePosts = [];
  var intersectedPosts = [];
  var intersectedPostsMain = [];
  var roots = [];
  var rightRoots = [];
  var foundationStarts = [];
  var foundationStartsRight = [];
  var foundations = [];
  var foundationsRight = [];
  var sturmankersRuckseite = [];
  var sturmankersRuckseiteRight = [];
  var sturmankersVorderseite = [];
  var sturmankersVorderseiteRight = [];
  var foundationStartsVord = [];
  var foundationsVord = [];
  var foundationStartsRuck = [];
  var foundationsRuck = [];
  var newFenceForwardSigns = [];
  var newFenceRightSigns = [];
  var newFenceLeftSigns = [];
  var newFenceBackSigns = [];
  var addFenceSings = [];
  var fencesArr = [];
  var fakeFronts = [];
  var fakeBacks = [];
  var fakeLefts = [];
  var fakeRights = [];
  var fakeFences = [];
  var wholeFences = [];

  let allLProfiles = [];
  let allLprofilesComb = [];
  var rhombus180180Arr = [];
  var rhombus90180Arr = [];
  var rhombus60180Arr = [];
  var rhombus150180Arr = [];
  var raRhombus60180Arr = [];
  var raRhombus50180Arr = [];
  var kapijaArr = [];
  var kapijaPartsArr = [];

  var allFences = [];

  //FUNCTONS TO GET AND SET ABSOLUTE POSTIOIONS
  var getAbsPosX = (mesh) => {
    mesh.computeWorldMatrix(true);
    return mesh.getAbsolutePosition().x;
  };
  var getAbsPosZ = (mesh) => {
    mesh.computeWorldMatrix(true);
    return mesh.getAbsolutePosition().z;
  };
  var getAbsPosY = (mesh) => {
    mesh.computeWorldMatrix(true);
    return mesh.getAbsolutePosition().y;
  };

  //CHANCHING SIZE ON SLIDER
  //function to change position and scale of fence
  function changePosAndScaleFence(valueToCount, activeFence) {
    // if (valueToCount > 15) {
    fenceScale = valueToCount / 180;
    // } else {
    //   fenceScale = 0.08;
    // }
    fenceSize = 1.8 * fenceScale;

    firstX = getAbsPosX(rightPosts[activeFence]);
    firstZ = getAbsPosZ(rightPosts[activeFence]);

    fakeFences[activeFence].scaling.x = fenceScale;
    fakeFences[activeFence].position.x = -0.9 + fenceSize / 2;

    if (fencesArr[activeFence].type == "rhombus150180")
      fakeFences[activeFence].position.x = 0.15;

    if (fencesArr[activeFence].type == "rhombus90180")
      fakeFences[activeFence].position.x = 0.45;
    if (
      fencesArr[activeFence].type == "rhombus60180" ||
      fencesArr[activeFence].type == "raRhombus60180"
    )
      fakeFences[activeFence].position.x = 0.6;
    if (fencesArr[activeFence].type == "raRhombus50180")
      fakeFences[activeFence].position.x = 0.65;
    if (fencesArr[activeFence].type == "kapija")
      fakeFences[activeFence].position.x = 0.4;

    rightPosts[activeFence].position.x = -0.9 + fenceSize;
    rightPostCaps[activeFence].position.x = rightPosts[activeFence].position.x;

    rightWoodPosts[activeFence].position.x = -0.9 + fenceSize;

    newFenceForwardSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]) + 0.3,
        newFenceForwardSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence])
      )
    );

    newFenceRightSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]),
        newFenceRightSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence]) - 0.3
      )
    );

    newFenceLeftSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]),
        newFenceLeftSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence]) + 0.3
      )
    );

    newFenceBackSigns[activeFence].setAbsolutePosition(
      new BABYLON.Vector3(
        getAbsPosX(rightPosts[activeFence]) - 0.3,
        newFenceBackSigns[activeFence].position.y,
        getAbsPosZ(rightPosts[activeFence])
      )
    );

    secondX = getAbsPosX(rightPosts[activeFence]);
    secondZ = getAbsPosZ(rightPosts[activeFence]);

    //set this fence obj size
    fencesArr[activeFence].size = valueToCount;
  }

  function scaleToOtherFencesToDo(i) {
    wholeFences[i].position.x = wholeFences[i].position.x - (firstX - secondX);
    wholeFences[i].position.z = wholeFences[i].position.z - (firstZ - secondZ);

    newFenceForwardSigns[i].position.x =
      newFenceForwardSigns[i].position.x - (firstX - secondX);
    newFenceForwardSigns[i].position.z =
      newFenceForwardSigns[i].position.z - (firstZ - secondZ);

    newFenceRightSigns[i].position.x =
      newFenceRightSigns[i].position.x - (firstX - secondX);
    newFenceRightSigns[i].position.z =
      newFenceRightSigns[i].position.z - (firstZ - secondZ);

    newFenceLeftSigns[i].position.x =
      newFenceLeftSigns[i].position.x - (firstX - secondX);
    newFenceLeftSigns[i].position.z =
      newFenceLeftSigns[i].position.z - (firstZ - secondZ);

    newFenceBackSigns[i].position.x =
      newFenceBackSigns[i].position.x - (firstX - secondX);
    newFenceBackSigns[i].position.z =
      newFenceBackSigns[i].position.z - (firstZ - secondZ);
  }

  function positionChildrenOnParentSizeChange(activeFence) {
    for (let i = 0; i < fencesArr[activeFence].children.length; i++) {
      a = fencesArr[activeFence].children[i];
      scaleToOtherFencesToDo(a);
      recursiveToChildrenPositionChange(a);
    }
  }
  function recursiveToChildrenPositionChange(a) {
    if (fencesArr[a].children.length > 0) {
      fencesArr[a].children.forEach((elm) => {
        scaleToOtherFencesToDo(elm);
        recursiveToChildrenPositionChange(elm);
      });
    }
  }

  //MAIN POST MESH //////////////////////////////////////////////////////////////////////////
  BABYLON.SceneLoader.ImportMeshAsync("", "mesh/", "kopfGerundet.glb").then(
    (result) => {
      var mainPost = result.meshes[0];
      mainPost.rotationQuaternion = null;
      mainPost.scaling = new BABYLON.Vector3(1.01, 1, 1.01);
      mainPost.addRotation(0, Math.PI, 0);

      // for (let i = 0; i < result.meshes.length; i++) {
      //   console.log(i, result.meshes[i].name);
      // }

      //METAL PART TO HOLD WOOD POST
      let leftMetalPart = result.meshes[10];
      leftMetalPart.material = rootMat;
      metalParts.unshift(leftMetalPart);

      //SMALL METAL PART TO HOLD WOOD POST
      let leftSmallMetalPartFront = result.meshes[8];
      let leftSmallMetalPartBack = result.meshes[6];
      let leftSmallMetalPartBoth = result.meshes[7];
      leftSmallMetalPartFront.material =
        leftSmallMetalPartBack.material =
        leftSmallMetalPartBoth.material =
          rootMat;
      var newSmallMetPartsArr = new Array(
        leftSmallMetalPartFront,
        leftSmallMetalPartBack,
        leftSmallMetalPartBoth
      );
      newSmallMetPartsArr.forEach((elm) => {
        elm.isVisible = false;
      });
      smallMetalParts.unshift(newSmallMetPartsArr);

      // //WOOD POST
      let leftWoodPost = result.meshes[9];
      leftWoodPost.material = postWoodMaterials[0];
      //   leftWoodPost.addRotation(0, 0, Math.PI);
      allWoodPosts.unshift(leftWoodPost);
      //   leftWoodPost.isVisible = false;

      //POST CAP
      let leftPostCap = result.meshes[1];
      leftPostCap.material = capMat;
      leftPostCaps.unshift(leftPostCap);
      leftPostCap.isVisible = false;

      let leftPostCapClone = leftPostCap.clone("leftPostCapClone");
      leftPostCapClone.position.y = 0.052;
      leftPostCapClone.isVisible = false;
      leftPostCapClones.unshift(leftPostCapClone);

      //POSTS
      let leftPost = result.meshes[2];
      leftPost.addRotation(0, Math.PI, 0);
      leftPosts.unshift(leftPost);
      allPosts.unshift(leftPost);
      leftPost.material = fencePostMat;
      leftPost.isVisible = false;

      //cerate fake rigth post
      let fakePost = new BABYLON.MeshBuilder.CreateBox(
        "fakePost",
        { width: 0.05, height: 2.1, depth: 0.05 },
        scene
      );
      fakePost.position.y = 1.05;
      //   fakePost.parent = leftPost;
      fakePosts.unshift(fakePost);
      fakePost.isVisible = false;

      createMainPostSigns();
      //add selected to mesh
      leftWoodPost.actionManager = new BABYLON.ActionManager(scene);
      leftPost.actionManager = new BABYLON.ActionManager(scene);

      function setActivnesLeftPosts(post) {
        post.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
              if (post.material.id != "selectedMat" && post.scaling.x == 1) {
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
                activeFence = false;
                post.material = selectedMat;
                addFenceSings[0].isVisible = true;
                addFenceSings[1].isVisible = true;
                intersectArrowSignsFence(
                  fakeFences,
                  newFenceForwardSigns,
                  newFenceRightSigns,
                  newFenceLeftSigns,
                  newFenceBackSigns,
                  activeFence,
                  addFenceSings
                );
                if (leftPosts[0].isVisible) {
                  sideAccesories.style.display = "block";
                  editPost.style.display = "block";
                  if (
                    (leftPost.scaling.z > 0.999 && leftPost.scaling.z < 1.1) ||
                    leftPost.scaling.z < 0.55
                  ) {
                    setActivnesStyle(
                      pfostensSingle,
                      0,
                      0,
                      "active-text-color-single-pfosten"
                    );
                  } else if (
                    (leftPost.scaling.z > 1.1 && leftPost.scaling.z < 1.4) ||
                    (leftPost.scaling.z > 0.7 && leftPost.scaling.z < 0.8)
                  ) {
                    setActivnesStyle(
                      pfostensSingle,
                      0,
                      1,
                      "active-text-color-single-pfosten"
                    );
                  } else if (
                    leftPost.scaling.z > 1.4 ||
                    (leftPost.scaling.z < 1 && leftPost.scaling.z > 0.9)
                  ) {
                    setActivnesStyle(
                      pfostensSingle,
                      0,
                      2,
                      "active-text-color-single-pfosten"
                    );
                  }
                  document.getElementsByClassName("accTitle")[0].innerHTML =
                    "Pfosten bearbeiten";
                }
              } else {
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
                addFenceSings[0].isVisible = false;
                addFenceSings[1].isVisible = false;
                if (leftPosts[0].isVisible) {
                  post.material = fencePostMat;
                  document.getElementsByClassName("accTitle")[0].innerHTML =
                    "ausgewählter Zaun";
                  sideAccesories.style.display = "none";
                  editPost.style.display = "none";
                }
              }
            }
          )
        );
      }
      setActivnesLeftPosts(leftWoodPost);
      setActivnesLeftPosts(leftPost);
      //post roots
      let leftRoot = result.meshes[3];
      leftRoot.isVisible = false;
      roots.unshift(leftRoot);

      leftRoot.material = rootMat;

      //create foundation start
      let foundationLeftStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationLeftStart",
        { width: 0.4, height: 0.4 },
        scene
      );
      foundationLeftStart.position = new BABYLON.Vector3(
        leftPost.position.x,
        0.0001,
        0
      );
      foundationLeftStart.material = concreteMat;
      foundationStarts.unshift(foundationLeftStart);

      //create foundation
      let foundationLeft = new BABYLON.MeshBuilder.CreateBox(
        "foundationLeft",
        { width: 0.4, height: 0.5, depth: 0.4 },
        scene
      );
      foundationLeft.position.x = foundationLeftStart.position.x;
      foundationLeft.position.y = -0.5 / 2;
      foundationLeft.material = foundationMat;

      foundations.unshift(foundationLeft);

      //STRUMANKER
      //VORD ***************
      let leftStrVord = result.meshes[4];
      leftStrVord.isVisible = false;

      sturmankersVorderseite.unshift(leftStrVord);

      leftStrVord.position.z += 0.011;
      //create foundation start for front stunmankwer
      let foundationVordStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationVordStart",
        { width: 0.4, height: 0.7 },
        scene
      );

      foundationVordStart.position = new BABYLON.Vector3(0, 0.13, 0);
      foundationVordStart.rotation.x = -Math.PI / 2;
      foundationVordStart.material = concreteMat;
      foundationVordStart.parent = leftRoot;
      foundationStartsVord.unshift(foundationVordStart);
      foundationVordStart.isVisible = false;
      //create foundation for front stunmankwer
      let foundationVord = new BABYLON.MeshBuilder.CreateBox(
        "foundationVord",
        { width: 0.4, height: 0.7, depth: 0.5 },
        scene
      );
      foundationVord.material = foundationMat;
      foundationVord.position = new BABYLON.Vector3(0, 0.13, 0.251);
      foundationVord.parent = leftRoot;
      foundationsVord.unshift(foundationVord);
      foundationVord.isVisible = false;

      // RUCK **********
      let leftStrRuck = result.meshes[5];
      leftStrRuck.isVisible = false;

      sturmankersRuckseite.unshift(leftStrRuck);
      sturmankersRuckseite[0].position.z -= 0.01;
      //create foundation start for back stunmankwer
      let foundationRuckStart = new BABYLON.MeshBuilder.CreateGround(
        "foundationRuckStart",
        { width: 0.4, height: 0.7 },
        scene
      );
      foundationRuckStart.position = new BABYLON.Vector3(0, -0.13, 0);
      foundationRuckStart.rotation.x = -Math.PI / 2;
      foundationRuckStart.material = concreteMat;
      foundationRuckStart.parent = leftRoot;
      foundationStartsRuck.unshift(foundationRuckStart);
      foundationRuckStart.isVisible = false;

      //create foundation for back stunmankwer
      let foundationRuck = new BABYLON.MeshBuilder.CreateBox(
        "foundationRuck",
        { width: 0.4, height: 0.7, depth: 0.5 },
        scene
      );
      foundationRuck.material = foundationMat;
      foundationRuck.position = new BABYLON.Vector3(0, -0.13, 0.251);
      foundationRuck.parent = leftRoot;
      foundationsRuck.unshift(foundationRuck);
      foundationRuck.isVisible = false;

      //set material
      leftStrVord.material = leftStrRuck.material = sturmankerMat;

      //cerate fake strumanker
      let fakeFront = new BABYLON.MeshBuilder.CreateBox(
        "fakeFront",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeFront.parent = leftStrVord;
      fakeFronts.unshift(fakeFront);
      fakeFront.isVisible = false;

      let fakeBack = new BABYLON.MeshBuilder.CreateBox(
        "fakeBack",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeBack.parent = leftStrRuck;
      fakeBacks.unshift(fakeBack);
      fakeBack.isVisible = false;

      let fakeLeft = new BABYLON.MeshBuilder.CreateBox(
        "fakeLeft",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeLeft.parent = leftStrRuck;
      fakeLeft.addRotation(0, 0, Math.PI / 2);
      fakeLeft.position = new BABYLON.Vector3(0.2, 0.19, 0);
      fakeLefts.unshift(fakeLeft);

      fakeLeft.isVisible = false;

      let fakeRight = new BABYLON.MeshBuilder.CreateBox(
        "fakeRight",
        { width: 0.01, height: 0.3, depth: 0.3 },
        scene
      );
      fakeRight.parent = leftStrVord;
      fakeRight.addRotation(0, 0, Math.PI / 2);
      fakeRight.position = new BABYLON.Vector3(-0.2, -0.19, 0);
      fakeRights.unshift(fakeRight);
      fakeRight.isVisible = false;

      //SET CHILDREN
      //   leftPostCap.addChild(signPlaneWarLeft);
      //   leftPostCap.addChild(signPlaneDelLeft);
      leftPostCap.addChild(foundationLeft);
      //   leftPostCap.addChild(leftLed);
      leftPostCap.addChild(leftStrVord);
      leftPostCap.addChild(leftStrRuck);
      // leftPostCap.addChild(leftStrRuckSraf);
      leftPostCap.addChild(leftRoot);
      // leftPostCap.addChild(leftRoot1);

      leftPostCap.addChild(foundationVordStart);
      leftPostCap.addChild(foundationVord);
      leftPostCap.addChild(foundationRuckStart);
      leftPostCap.addChild(foundationRuck);

      //set Ground
      setGround();
    }

    //END OF MAIN POST
  );

  function NewFence(id, type, size, children, color) {
    this.id = id;
    this.type = type;
    this.size = size;
    this.children = children;
    this.color = color;
  }

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   //LOAD FENCE MESH
  var fenceIdCount = -1;
  var activeFence = false;
  // var createRightFence = (posX, posZ, rotY, type, smCol, inlaysOnOff) =>
  var createRightFence = (posX, posZ, rotY, type) =>
    BABYLON.SceneLoader.ImportMeshAsync("", "mesh/", "rhombus10.glb").then(
      (result) => {
        var fence = result.meshes[0];
        fence.rotationQuaternion = null;

        //MINI//////////
        if (localStorage.getItem("coordinates") != null && !activeFence) {
          fencesCoordinatesInLoader = localStorage.getItem("coordinates");
          fencesCoordinatesInLoader = JSON.parse(fencesCoordinatesInLoader);
          fence.position.x = fencesCoordinatesInLoader[fenceIdCount + 1][0];
          fence.position.z = fencesCoordinatesInLoader[fenceIdCount + 1][1];
          fence.rotation.y = fencesCoordinatesInLoader[fenceIdCount + 1][2];
        } else {
          fence.position.x = posX;
          fence.position.z = posZ;
          fence.rotation.y = rotY;
        }
        /////////////////////////

        wholeFences.push(fence);

        // for (let i = 0; i < result.meshes.length; i++) {
        //   console.log(i, result.meshes[i].name);
        // }

        //function to active fence
        function toActiveFence() {
          //set this active fence
          for (let j = 0; j < rightPosts.length; j++) {
            if (rightPosts[j].material.id == "selectedMat") {
              activeFence = j;
            }
          }
          sideAccesories.style.display = "block";
          addFenceAcc.style.display = "block";

          //set delete fence image and text
          deleteFenceOn(activeFence);
          //delete fence
          deleteFencePart.onclick = () => {
            if (activeFence > 0) {
              delFenFun(activeFence);
              deleteFence(activeFence);
              checkPostIntersecting(
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

              //set activnes of sturmanker parts
              sturNum = 0;
              for (let i = 0; i < sturmankersVorderseite.length; i++) {
                if (sturmankersVorderseite[i].isVisible) {
                  sturNum += 1;
                } else if (sturmankersRuckseite[i].isVisible) {
                  sturNum += 1;
                }
              }
              if (sturNum < 1) {
                setActivnesStyle(sturmankerCon, 4, 1, "active-text-color");
                strurmOn = false;
              } else {
                strurmOn = true;
              }
            }
          };

          //set signs visibility baste on intesection with fances
          if (fencesArr[activeFence].children.length < 2) {
            newFenceForwardSigns[activeFence].isVisible = true;
            newFenceRightSigns[activeFence].isVisible = true;
            newFenceLeftSigns[activeFence].isVisible = true;
            newFenceBackSigns[activeFence].isVisible = true;
          }
          intersectArrowSignsFence(
            fakeFences,
            newFenceForwardSigns,
            newFenceRightSigns,
            newFenceLeftSigns,
            newFenceBackSigns,
            activeFence,
            addFenceSings
          );

          // set activnes of active fence settings
          if (fencesArr[activeFence].type == "rhombus180180")
            setActivnesStyle(changeFence, 0, 0, "active-text-color");
          if (fencesArr[activeFence].type == "rhombus90180")
            setActivnesStyle(changeFence, 0, 1, "active-text-color");
          if (fencesArr[activeFence].type == "rhombus60180")
            setActivnesStyle(changeFence, 0, 2, "active-text-color");
          if (fencesArr[activeFence].type == "rhombus150180")
            setActivnesStyle(changeFence, 0, 3, "active-text-color");
          if (fencesArr[activeFence].type == "raRhombus60180")
            setActivnesStyle(changeFence, 0, 4, "active-text-color");
          if (fencesArr[activeFence].type == "raRhombus50180")
            setActivnesStyle(changeFence, 0, 5, "active-text-color");
          changeKapijaPartsColor.style.display = "none";
          changeKapijaPartsColorCont.style.display = "none";
          if (fencesArr[activeFence].type == "kapija") {
            setActivnesStyle(changeFence, 0, 6, "active-text-color");
            changeKapijaPartsColor.style.display = "flex";
            changeKapijaPartsColorCont.style.display = "flex";
            if (kapijaPartsArr[activeFence].material.name == "kapijaPartsMat1")
              setActivnesStyle(
                kapijaPartsMatSingle,
                1,
                0,
                "active-text-color-single"
              );
            if (kapijaPartsArr[activeFence].material.name == "kapijaPartsMat2")
              setActivnesStyle(
                kapijaPartsMatSingle,
                1,
                1,
                "active-text-color-single"
              );
            if (kapijaPartsArr[activeFence].material.name == "kapijaPartsMat3")
              setActivnesStyle(
                kapijaPartsMatSingle,
                1,
                2,
                "active-text-color-single"
              );
          }

          //deactivate arrows
          activeArrow = false;
          activeArrowSide = false;
          addFenceSings.forEach((elm) => {
            elm.material = addNewFenceMeshMat;
          });
          addNewFenceToSide.style.display = "none";

          //boards colors single
          // if (fencesArr[activeFence].color == "grun")
          //   setActivnesStyle(boardsMatSingle, 0, 0, "active-text-color-single");
          // if (fencesArr[activeFence].color == "grau")
          //   setActivnesStyle(boardsMatSingle, 0, 1, "active-text-color-single");

          cameraTargetMesh(cameraTarget, wholeFences[activeFence]);
          // console.log(fencesArr[activeFence]);
        }

        //add selected to mesh
        for (let i = 0; i < result.meshes.length; i++) {
          result.meshes[i].actionManager = new BABYLON.ActionManager(scene);
          result.meshes[i].actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              function () {
                if (result.meshes[i].material.id != "selectedMat") {
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
                  result.meshes[1].material =
                    result.meshes[2].material =
                    result.meshes[8].material =
                    result.meshes[10].material =
                    result.meshes[13].material =
                    result.meshes[14].material =
                    result.meshes[15].material =
                    result.meshes[16].material =
                    result.meshes[17].material =
                      selectedMat;
                  //function for fence activnes
                  toActiveFence();
                } else {
                  // closeSliderContainer();
                  sideAccesories.style.display = "none";
                  addFenceAcc.style.display = "none";
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
                  //turn off add new sings
                  newFenceForwardSigns[activeFence].isVisible = false;
                  newFenceRightSigns[activeFence].isVisible = false;
                  newFenceLeftSigns[activeFence].isVisible = false;
                  newFenceBackSigns[activeFence].isVisible = false;
                  cameraTargetMesh(cameraTarget, ground);
                  //turn of active fence
                  setTimeout(() => {
                    activeFence = false;
                  }, 100);
                }
              }
            )
          );
        }

        //fake fence for intersection
        let fakeFence = new BABYLON.MeshBuilder.CreateBox(
          "fakeFence",
          { width: 1.7, height: 1.8, depth: 0.05 },
          scene
        );
        fakeFence.position = new BABYLON.Vector3(
          getAbsPosX(result.meshes[1]),
          0.9,
          getAbsPosZ(result.meshes[1])
        );
        fakeFence.addRotation(0, rotY, 0);
        fakeFences.push(fakeFence);

        fakeFence.isVisible = false;
        result.meshes[1].addChild(fakeFence);

        //POST CAP
        let rightPostCap = result.meshes[7];
        rightPostCap.material = capMat;
        rightPostCaps.push(rightPostCap);
        if (postType == 0) {
          rightPostCap.isVisible = false;
        }

        let rightPostCapClone = rightPostCap.clone("rightPostCapClone");
        rightPostCapClone.position.y = 0.052;
        rightPostCapClone.isVisible = false;
        rightPostCapClones.push(rightPostCapClone);

        // var editPost = document.getElementById("editPost");
        //POSTS
        let rightPost = result.meshes[8];
        rightPost.material = fencePostMat;
        rightPosts.push(rightPost);
        allPosts.push(rightPost);
        if (postType == 0) {
          rightPost.isVisible = false;
        }

        //create fake rigth post
        let fakePost = new BABYLON.MeshBuilder.CreateBox(
          "fakePost",
          { width: 0.05, height: 0.05, depth: 2.1 },
          scene
        );
        fakePost.parent = rightPost;
        fakePosts.push(fakePost);
        fakePost.isVisible = false;

        checkPostIntersecting(
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

        rightPost.actionManager = new BABYLON.ActionManager(scene);
        rightPost.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function () {
              if (
                rightPost.material.id != "selectedMat" &&
                rightPost.scaling.x == 1
              ) {
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
                rightPost.material = selectedMat;
                sideAccesories.style.display = "block";
                editPost.style.display = "block";
                if (
                  (rightPost.scaling.z > 0.999 && rightPost.scaling.z < 1.1) ||
                  rightPost.scaling.z < 0.55
                ) {
                  setActivnesStyle(
                    pfostensSingle,
                    0,
                    0,
                    "active-text-color-single-pfosten"
                  );
                } else if (
                  (rightPost.scaling.z > 1.1 && rightPost.scaling.z < 1.4) ||
                  (rightPost.scaling.z > 0.7 && rightPost.scaling.z < 0.8)
                ) {
                  setActivnesStyle(
                    pfostensSingle,
                    0,
                    1,
                    "active-text-color-single-pfosten"
                  );
                } else if (
                  rightPost.scaling.z > 1.4 ||
                  (rightPost.scaling.z < 1 && rightPost.scaling.z > 0.9)
                ) {
                  setActivnesStyle(
                    pfostensSingle,
                    0,
                    2,
                    "active-text-color-single-pfosten"
                  );
                }
                document.getElementsByClassName("accTitle")[0].innerHTML =
                  "Pfosten bearbeiten";
              } else {
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
              }
            }
          )
        );

        //METAL PART TO HOLD WOOD POST
        let rightMetalPart = result.meshes[6];
        rightMetalPart.material = rootMat;
        metalParts.push(rightMetalPart);
        rightMetalParts.push(rightMetalPart);

        //SMALL METAL PART TO HOLD WOOD POST
        let rightSmallMetalPartFront = result.meshes[5];
        let rightSmallMetalPartBack = result.meshes[3];
        let rightSmallMetalPartBoth = result.meshes[4];
        rightSmallMetalPartFront.material =
          rightSmallMetalPartBack.material =
          rightSmallMetalPartBoth.material =
            rootMat;
        var newSmallMetPartsArr = new Array(
          rightSmallMetalPartFront,
          rightSmallMetalPartBack,
          rightSmallMetalPartBoth
        );
        newSmallMetPartsArr.forEach((elm) => {
          elm.isVisible = false;
        });
        smallMetalParts.push(newSmallMetPartsArr);
        rightSmallMetalParts.push(newSmallMetPartsArr);

        //WOOD POST
        let rightWoodPost = result.meshes[10];
        rightWoodPost.material = woodMaterials[0];
        allWoodPosts.push(rightWoodPost);
        rightWoodPosts.push(rightWoodPost);

        if (postType == 1) {
          rightWoodPost.isVisible = false;
          rightMetalPart.isVisible = false;
        }

        //post roots
        let rightRoot = result.meshes[9];
        if (postType == 0) {
          rightRoot.isVisible = false;
        }
        roots.push(rightRoot);
        rightRoots.push(rightRoot);

        rightRoot.material = rootMat;

        //create foundation start
        let foundationRightStart = new BABYLON.MeshBuilder.CreateGround(
          "foundationRightStart",
          { width: 0.4, height: 0.4 },
          scene
        );

        foundationRightStart.position = new BABYLON.Vector3(
          getAbsPosX(result.meshes[9]),
          0.0001,
          getAbsPosZ(result.meshes[9])
        );
        foundationRightStart.material = concreteMat;

        foundationStarts.push(foundationRightStart);
        foundationStartsRight.push(foundationRightStart);

        //create foundation
        let foundationRight = new BABYLON.MeshBuilder.CreateBox(
          "foundationRight",
          { width: 0.4, height: 0.5, depth: 0.4 },
          scene
        );

        foundationRight.position = new BABYLON.Vector3(
          getAbsPosX(result.meshes[9]),
          -0.5 / 2,
          getAbsPosZ(result.meshes[9])
        );
        foundationRight.material = foundationMat;

        foundations.push(foundationRight);
        foundationsRight.push(foundationRight);

        //STRUMANKER
        let rightStrVord = result.meshes[11];
        rightStrVord.isVisible = false;

        sturmankersVorderseite.push(rightStrVord);

        sturmankersVorderseiteRight.push(rightStrVord);
        if (postType == 0) {
          rightStrVord.position.z += 0.011;
        }

        //create foundation start for front stunmankwer
        let foundationVordStart = new BABYLON.MeshBuilder.CreateGround(
          "foundationVordStart",
          { width: 0.4, height: 0.7 },
          scene
        );

        foundationVordStart.position = new BABYLON.Vector3(0, 0.13, 0);
        foundationVordStart.rotation.x = -Math.PI / 2;
        foundationVordStart.material = concreteMat;
        foundationVordStart.parent = rightRoot;
        foundationStartsVord.push(foundationVordStart);
        foundationVordStart.isVisible = false;
        //create foundation for front stunmankwer
        let foundationVord = new BABYLON.MeshBuilder.CreateBox(
          "foundationVord",
          { width: 0.4, height: 0.7, depth: 0.5 },
          scene
        );

        foundationVord.material = foundationMat;
        foundationVord.position = new BABYLON.Vector3(0, 0.13, 0.251);
        foundationVord.parent = rightRoot;
        foundationsVord.push(foundationVord);
        foundationVord.isVisible = false;

        ///sturmanker Ruck
        let rightStrRuck = result.meshes[12];
        rightStrRuck.isVisible = false;

        sturmankersRuckseite.push(rightStrRuck);

        sturmankersRuckseiteRight.push(rightStrRuck);
        if (postType == 0) {
          rightStrRuck.position.z -= 0.01;
        }

        //create foundation start for back stunmankwer
        let foundationRuckStart = new BABYLON.MeshBuilder.CreateGround(
          "foundationRuckStart",
          { width: 0.4, height: 0.7 },
          scene
        );

        foundationRuckStart.position = new BABYLON.Vector3(0, -0.13, 0);
        foundationRuckStart.rotation.x = -Math.PI / 2;
        foundationRuckStart.material = concreteMat;
        foundationRuckStart.parent = rightRoot;
        foundationStartsRuck.push(foundationRuckStart);
        foundationRuckStart.isVisible = false;

        //create foundation for back stunmankwer
        let foundationRuck = new BABYLON.MeshBuilder.CreateBox(
          "foundationRuck",
          { width: 0.4, height: 0.7, depth: 0.5 },
          scene
        );

        foundationRuck.material = foundationMat;
        foundationRuck.position = new BABYLON.Vector3(0, -0.13, 0.251);
        foundationRuck.parent = rightRoot;
        foundationsRuck.push(foundationRuck);
        foundationRuck.isVisible = false;

        //set material
        rightStrVord.material = rightStrRuck.material = sturmankerMat;

        //cerate fake strumanker
        let fakeFront = new BABYLON.MeshBuilder.CreateBox(
          "fakeFront",
          { width: 0.01, height: 0.3, depth: 0.3 },
          scene
        );
        fakeFront.parent = rightStrVord;
        fakeFronts.push(fakeFront);
        fakeFront.isVisible = false;

        let fakeBack = new BABYLON.MeshBuilder.CreateBox(
          "fakeBack",
          { width: 0.01, height: 0.3, depth: 0.3 },
          scene
        );
        fakeBack.parent = rightStrRuck;
        fakeBacks.push(fakeBack);
        fakeBack.isVisible = false;

        let fakeLeft = new BABYLON.MeshBuilder.CreateBox(
          "fakeLeft",
          { width: 0.01, height: 0.3, depth: 0.3 },
          scene
        );
        fakeLeft.parent = rightStrRuck;
        fakeLeft.addRotation(0, 0, Math.PI / 2);
        fakeLeft.position = new BABYLON.Vector3(-0.2, 0.19, 0);
        fakeLefts.push(fakeLeft);

        fakeLeft.isVisible = false;

        let fakeRight = new BABYLON.MeshBuilder.CreateBox(
          "fakeRight",
          { width: 0.01, height: 0.3, depth: 0.3 },
          scene
        );
        fakeRight.parent = rightStrVord;
        fakeRight.addRotation(0, 0, Math.PI / 2);
        fakeRight.position = new BABYLON.Vector3(0.2, -0.19, 0);
        fakeRights.push(fakeRight);
        fakeRight.isVisible = false;

        //         //SET CHILDREN
        rightPostCap.addChild(rightPostCapClone);
        rightPostCap.addChild(foundationRightStart);
        // rightPostCap.addChild(rightLed);
        rightPostCap.addChild(rightStrVord);
        // rightPostCap.addChild(rightStrVordSraf);
        rightPostCap.addChild(rightStrRuck);
        // rightPostCap.addChild(rightStrRuckSraf);
        rightPostCap.addChild(rightRoot);
        // rightPostCap.addChild(rightRoot1);

        rightPostCap.addChild(rightMetalPart);
        // rightPostCap.addChild(rightMetalPart1);
        newSmallMetPartsArr.forEach((elm) => {
          rightPostCap.addChild(elm);
        });

        rightPostCap.addChild(foundationRight);
        rightPostCap.addChild(foundationVordStart);
        rightPostCap.addChild(foundationVord);
        rightPostCap.addChild(foundationRuckStart);
        rightPostCap.addChild(foundationRuck);
        //diferent fences
        rightPostCap.addChild(result.meshes[1]);
        rightPostCap.addChild(result.meshes[2]);
        rightPostCap.addChild(result.meshes[13]);
        rightPostCap.addChild(result.meshes[14]);
        rightPostCap.addChild(result.meshes[15]);
        rightPostCap.addChild(result.meshes[16]);
        rightPostCap.addChild(result.meshes[17]);
        rightPostCap.addChild(result.meshes[18]);
        //l-profili
        rightPostCap.addChild(result.meshes[22]);
        rightPostCap.addChild(result.meshes[23]);
        rightPostCap.addChild(result.meshes[24]);

        //INTERSECTION FUNCTION
        intersectionFunction(
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

        //L-PROFILES
        let lprofiles180180 = [
          result.meshes[19],
          result.meshes[20],
          result.meshes[21],
          result.meshes[22],
          result.meshes[23],
          result.meshes[24],
        ];
        let lprofiles90180 = [
          result.meshes[20],
          result.meshes[21],
          result.meshes[23],
          result.meshes[24],
        ];
        let lprofiles60180 = [
          result.meshes[20],
          result.meshes[21],
          result.meshes[23],
          result.meshes[24],
        ];
        let lprofiles150180 = [
          result.meshes[20],
          result.meshes[21],
          result.meshes[23],
          result.meshes[24],
        ];
        let lprofiles60180ra = [
          result.meshes[20],
          result.meshes[21],
          result.meshes[23],
          result.meshes[24],
        ];
        let lprofiles50180 = [
          result.meshes[20],
          result.meshes[21],
          result.meshes[23],
          result.meshes[24],
        ];

        let allLProfilesThis = new Array(
          lprofiles180180,
          lprofiles90180,
          lprofiles60180,
          lprofiles150180,
          lprofiles60180ra,
          lprofiles50180
        );

        allLProfilesThis.forEach((elm) => {
          elm.forEach((element) => {
            element.isVisible = false;
            element.material = rootMat;
          });
        });
        allLProfiles.push(allLProfilesThis);
        allLprofilesComb.push(
          result.meshes[19],
          result.meshes[20],
          result.meshes[21],
          result.meshes[22],
          result.meshes[23],
          result.meshes[24]
        );

        //CREATE SINGS FUNCTION
        createNewFenceSign();

        let rhombus180180 = result.meshes[1];
        rhombus180180Arr.push(rhombus180180);
        rhombus180180.isVisible = false;

        let rhombus90180 = result.meshes[2];
        rhombus90180Arr.push(rhombus90180);
        rhombus90180.isVisible = false;

        let rhombus60180 = result.meshes[13];
        rhombus60180Arr.push(rhombus60180);
        rhombus60180.isVisible = false;

        let rhombus150180 = result.meshes[14];
        rhombus150180Arr.push(rhombus150180);
        rhombus150180.isVisible = false;

        let raRhombus60180 = result.meshes[15];
        raRhombus60180Arr.push(raRhombus60180);
        raRhombus60180.isVisible = false;

        let raRhombus50180 = result.meshes[16];
        raRhombus50180Arr.push(raRhombus50180);
        raRhombus50180.isVisible = false;

        let kapija = result.meshes[17];
        kapijaArr.push(kapija);
        kapija.isVisible = false;

        let kapijaParts = result.meshes[18];
        kapijaPartsArr.push(kapijaParts);
        kapijaParts.isVisible = false;
        kapijaParts.material = kapijaPartsMat1;

        let allFencesThis = new Array(
          rhombus180180,
          rhombus90180,
          rhombus60180,
          rhombus150180,
          raRhombus60180,
          raRhombus50180,
          kapija
        );

        allFences.push(allFencesThis);

        allFencesThis.forEach((elm) => {
          elm.material = woodMaterials[0];
        });

        if (type == "rhombus180180") {
          rhombus180180.isVisible = true;
          lprofiles180180.forEach((elm) => {
            elm.isVisible = true;
          });
        }

        if (type == "rhombus90180") {
          rhombus90180.isVisible = true;
          lprofiles90180.forEach((elm) => {
            elm.isVisible = true;
          });
          setSmallerFenceSize(
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
            0.9
          );
        }

        if (type == "rhombus60180") {
          rhombus60180.isVisible = true;
          lprofiles60180.forEach((elm) => {
            elm.isVisible = true;
          });
          setSmallerFenceSize(
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
            1.2
          );
        }

        if (type == "rhombus150180") {
          rhombus150180.isVisible = true;
          lprofiles150180.forEach((elm) => {
            elm.isVisible = true;
          });
          setSmallerFenceSize(
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
            0.3
          );
        }

        if (type == "raRhombus60180") {
          raRhombus60180.isVisible = true;
          lprofiles60180ra.forEach((elm) => {
            elm.isVisible = true;
          });
          setSmallerFenceSize(
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
            1.2
          );
        }

        if (type == "raRhombus50180") {
          raRhombus50180.isVisible = true;
          lprofiles50180.forEach((elm) => {
            elm.isVisible = true;
          });
          setSmallerFenceSize(
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
            1.3
          );
        }

        if (type == "kapija") {
          kapija.isVisible = true;
          kapijaParts.isVisible = true;
          allLProfilesThis.forEach((elm) => {
            elm.forEach((element) => {
              element.isVisible = false;
            });
          });
          setSmallerFenceSize(
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
            0.8
          );
        }
        if (postType == 1) {
          allLProfilesThis.forEach((elm) => {
            elm.forEach((element) => {
              element.isVisible = false;
            });
          });
        }
        //SET NEW FENCE SAME POST SIZE AS THE OTHER
        if (befePfostenSize == 1) {
          rightPost.scaling.z = 1.2;
          rightPost.position.y = 0.7717;
          // if (type == "fionaKosaDesna" || type == "fionaKosaDesnaRupe") {
          //   rightPost.scaling.z = 0.724;
          //   rightPost.position.y = 0.3119;
          // }
          rightRoot.isVisible = false;

          foundationRight.scaling.y = 1;
          foundationVord.scaling.z = 1;
          foundationRuck.scaling.z = 1;

          foundationRight.position.z = 1.215;
          foundationVord.position.z = 1.215;
          foundationRuck.position.z = 1.215;
        }
        // setbefePfosten(1.2, 0.7717, false, 1, -0.5 / 2);
        if (befePfostenSize == 2) {
          rightPost.scaling.z = 1.475;
          rightPost.position.y = 0.511;
          // if (type == "fionaKosaDesna" || type == "fionaKosaDesnaRupe") {
          //   rightPost.scaling.z = 0.999;
          //   rightPost.position.y = 0.053;
          // }
          rightRoot.isVisible = false;

          foundationRight.scaling.y = 1.8;
          foundationVord.scaling.z = 1.8;
          foundationRuck.scaling.z = 1.8;

          foundationRight.position.z = 1.415;
          foundationVord.position.z = 1.415;
          foundationRuck.position.z = 1.415;
        }
        //         // setbefePfosten(1.475, 0.511, false, 1.8, -0.9 / 2);

        //CREATE OBJ FOR FENCE
        fenceIdCount += 1;
        fenceId = fenceIdCount;

        fenceType = type;

        if (type == "rhombus180180") {
          fenceSizeObj = 180;
        }

        if (type == "rhombus90180") {
          fenceSizeObj = 90;
        }

        if ((type == "rhombus60180", "raRhombus60180")) {
          fenceSizeObj = 60;
        }

        if (type == "rhombus150180") {
          fenceSizeObj = 150;
        }

        if (type == "raRhombus50180") {
          fenceSizeObj = 50;
        }

        if (type == "kapija") {
          fenceSizeObj = 100;
        }

        childrenThis = [];

        if (woodMaterialType[0] == 0) {
          allFencesThis.forEach((element) => {
            element.material = woodMaterials[0];
          });
          rightWoodPost.material = woodMaterials[0];
          boardColObj = "larche";
        }
        // if (woodMaterialType[0] == 1) {
        //   allFencesThis.forEach((element) => {
        //     element.material = woodMaterials[1];
        //   });
        //   rightWoodPost.material = woodMaterials[1];
        //   boardColObj = "grau";
        // }

        fencesArr.push(
          new NewFence(
            fenceId,
            fenceType,
            fenceSizeObj,
            childrenThis,
            boardColObj
          )
        );

        fencesArr[fenceId].status = "activeFence";

        if (fenceId > 0 && typeof activeFence != "boolean") {
          fencesArr[activeFence].children.push(fenceId);
          fencesArr[fenceId].parent = fencesArr[activeFence].id;

          //set parent right post
          if (
            rightPosts[fencesArr[fenceId].parent].isVisible ||
            rightWoodPosts[fencesArr[fenceId].parent].isVisible
          ) {
            if (rightPosts[fencesArr[fenceId].parent].scaling.z < 0.6) {
              rightWoodPosts[fencesArr[fenceId].parent].scaling.y = 1;
              rightWoodPosts[fencesArr[fenceId].parent].position.y = 0.962;
              rightPosts[fencesArr[fenceId].parent].scaling.z = 1;
              rightPosts[fencesArr[fenceId].parent].position.y = 0.962;
            }
            if (
              rightPosts[fencesArr[fenceId].parent].scaling.z > 0.7 &&
              rightPosts[fencesArr[fenceId].parent].scaling.z < 0.8
            ) {
              rightWoodPosts[fencesArr[fenceId].parent].scaling.y = 1.2;
              rightWoodPosts[fencesArr[fenceId].parent].position.y = 0.7717;
              rightPosts[fencesArr[fenceId].parent].scaling.z = 1.2;
              rightPosts[fencesArr[fenceId].parent].position.y = 0.7717;
            }
            if (
              rightPosts[fencesArr[fenceId].parent].scaling.z > 0.9 &&
              rightPosts[fencesArr[fenceId].parent].scaling.z < 1
            ) {
              rightWoodPosts[fencesArr[fenceId].parent].scaling.y = 1.475;
              rightWoodPosts[fencesArr[fenceId].parent].position.y = 0.511;
              rightPosts[fencesArr[fenceId].parent].scaling.z = 1.475;
              rightPosts[fencesArr[fenceId].parent].position.y = 0.511;
            }
            if (rightPosts[fencesArr[fenceId].parent].isVisible) {
              rightPostCaps[fencesArr[fenceId].parent].isVisible = true;
              rightPostCapClones[fencesArr[fenceId].parent].isVisible = false;
            }
          }
        }

        //MINI CONF//////////////////////////////////////////////////////////////////
        if (localStorage.getItem("coordinates") != null && !activeFence) {
          fencesCoordinatesInLoader = localStorage.getItem("coordinates");
          fencesCoordinatesInLoader = JSON.parse(fencesCoordinatesInLoader);
          if (fenceId == 0) {
            fencesArr[0].children = fencesCoordinatesInLoader[0][4];
            fencesArr[0].parent = undefined;
          }
          if (fenceId > 0) {
            fencesArr[fenceId].children = fencesCoordinatesInLoader[fenceId][4];
            fencesArr[fenceId].parent = fencesCoordinatesInLoader[fenceId][3];
          }
          if (fenceId === fencesCoordinatesInLoader.length - 1) {
            setTimeout(() => {
              localStorage.removeItem("coordinates");
            }, 2000);
          }
        }
        ///////////////////////////////////////////////////////////////////////////////////
        //set Ground
        setGround();
        // //
        //for loading
        setTimeout(() => {
          engine.hideLoadingUI();
        }, 3000);
        //       //END OF MESH
        //       /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    );
  //SET GROUND
  var groundSizeX = 0;
  var groundSizeZ = 0;

  function setGround() {
    arrX = [];
    arrZ = [];
    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].isVisible) {
        arrX.push(Math.round(getAbsPosX(allPosts[i]) * 100) / 100);
        arrZ.push(Math.round(getAbsPosZ(allPosts[i]) * 100) / 100);
      }
      if (allWoodPosts[i].isVisible) {
        arrX.push(Math.round(getAbsPosX(allWoodPosts[i]) * 100) / 100);
        arrZ.push(Math.round(getAbsPosZ(allWoodPosts[i]) * 100) / 100);
      }
    }
    arrX.sort(function (a, b) {
      return a - b;
    });
    arrZ.sort(function (a, b) {
      return a - b;
    });
    arrXFirst = Math.abs(arrX[0]);
    arrXSecond = arrX[arrX.length - 1];
    arrZFirst = Math.abs(arrZ[0]);
    arrZSecond = arrZ[arrZ.length - 1];
    groundSizeX = arrXFirst + arrXSecond + 1.1;
    groundSizeZ = arrZFirst + arrZSecond + 1.1;
    groundChange(groundSizeX, groundSizeZ);
    ground.position = new BABYLON.Vector3(
      (arrX[0] + arrX[arrX.length - 1]) / 2,
      0,
      (arrZ[0] + arrZ[arrZ.length - 1]) / 2
    );
    //aniamtion to change camera target position
    var animationCameraTarget = new BABYLON.Animation(
      "myAnimationcamera",
      "position",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const keyFrames = [];
    keyFrames.push({
      frame: 0,
      value: cameraTarget.position.clone(),
    });
    //change camera target position
    cameraTarget.position.x = ground.position.x;
    cameraTarget.position.z = ground.position.z;
    keyFrames.push({
      frame: 120,
      value: cameraTarget.position.clone(),
    });
    animationCameraTarget.setKeys(keyFrames);
    const easingFun2 = new BABYLON.CubicEase();
    easingFun2.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    animationCameraTarget.setEasingFunction(easingFun2);
    cameraTarget.animations.push(animationCameraTarget);
    //call animation
    scene.beginAnimation(cameraTarget, 0, 120, false);
    //set camera radius
    var cameraRadius;
    if (ground.scaling.x > ground.scaling.z) {
      if (ground.scaling.x < 2.7) {
        cameraRadius = 4;
      } else {
        cameraRadius = ground.scaling.x * 1.5;
      }
    } else {
      cameraRadius = ground.scaling.z * 1.5;
    }
    //radius  animation
    let radiusAnimation = new BABYLON.Animation(
      "radiusAnimation",
      "radius",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    let radiusKeyFrames = [];
    radiusKeyFrames.push({
      frame: 0,
      value: camera.radius,
    });
    radiusKeyFrames.push({
      frame: 120,
      value: cameraRadius,
    });
    radiusAnimation.setKeys(radiusKeyFrames);
    const easingFun = new BABYLON.CubicEase();
    easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    radiusAnimation.setEasingFunction(easingFun);
    camera.animations.push(radiusAnimation);
    //call radius animation
    scene.beginAnimation(camera, 0, 120, false);

    if (allPosts[0].isVisible) {
      displayGroundSizeX = Math.round((arrXFirst + arrXSecond) * 100 + 7);
      displayGroundSizeZ = Math.round((arrZFirst + arrZSecond) * 100 + 7);
    } else {
      displayGroundSizeX = Math.round((arrXFirst + arrXSecond) * 100 + 9);
      displayGroundSizeZ = Math.round((arrZFirst + arrZSecond) * 100 + 9);
    }
    //set ground text position and value
    //x
    groundTextX.position.x = groundTextX2.position.x = ground.position.x;
    groundTextX.position.z = ground.position.z + -ground.scaling.z / 2 - 0.2;
    groundTextX2.position.z = ground.position.z + ground.scaling.z / 2 + 0.2;
    textX = displayGroundSizeX + "cm";
    textureContextX.clearRect(0, 0, 512, 256);
    textureContextX.textAlign = "center";
    textureContextX.fillText(textX, 256, 140);
    textureGroundX.update();
    //z
    groundTextZ.position.x = ground.position.x + -ground.scaling.x / 2 - 0.2;
    groundTextZ2.position.x = ground.position.x + ground.scaling.x / 2 + 0.2;
    groundTextZ.position.z = groundTextZ2.position.z = ground.position.z;
    textZ = displayGroundSizeZ + "cm";
    textureContextZ.clearRect(0, 0, 512, 256);
    textureContextZ.textAlign = "center";
    textureContextZ.fillText(textZ, 256, 140);
    textureGroundZ.update();
  } ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //MINI CONF
  let fencesCoordinates = localStorage.getItem("coordinates");
  fencesCoordinates = JSON.parse(fencesCoordinates);
  //CREATE DEFAULT FENCE
  function handleTabActivnes() {
    if (!document.hidden) {
      if (localStorage.getItem("coordinates") === null) {
        createRightFence(0.99, 0, 0, "rhombus180180");
      } else {
        for (let i = 0; i < fencesCoordinates.length; i++) {
          createRightFence(
            fencesCoordinates[i][0],
            fencesCoordinates[i][1],
            fencesCoordinates[i][2],
            "rhombus180180"
          );
        }
      }
      clearInterval(refreshIntervalId);
    }
  }

  if (document.hidden) {
    var refreshIntervalId = setInterval(handleTabActivnes, 100);
  } else {
    if (localStorage.getItem("coordinates") === null) {
      createRightFence(0.99, 0, 0, "rhombus180180");
    } else {
      for (let i = 0; i < fencesCoordinates.length; i++) {
        createRightFence(
          fencesCoordinates[i][0],
          fencesCoordinates[i][1],
          fencesCoordinates[i][2],
          "rhombus180180"
        );
      }
    }
  }
  //END
  //////////////////////////////////////////////////////////////////////////////////
  //ADD NEW FENCES
  // let addNewFence180180 = document.getElementById("new-fence-180180");
  // addNewFence180180.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "rhombus180180",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };

  // let addNewFence90180 = document.getElementById("new-fence-90180");
  // addNewFence90180.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "rhombus90180",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };

  // let addNewFence60180 = document.getElementById("new-fence-60180");
  // addNewFence60180.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "rhombus60180",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };
  // let addNewFence150180 = document.getElementById("new-fence-150180");
  // addNewFence150180.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "rhombus150180",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };

  // let addNewFence601802 = document.getElementById("new-fence-60180-2");
  // addNewFence601802.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "raRhombus60180",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };

  // let addNewFence50180 = document.getElementById("new-fence-50180");
  // addNewFence50180.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "raRhombus50180",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };

  // let addNewFenceKapija = document.getElementById("new-fence-kapija");
  // addNewFenceKapija.onclick = () => {
  //   createNewFence(
  //     createRightFence,
  //     activeArrowSide,
  //     rightPosts,
  //     rightWoodPosts,
  //     leftPosts,
  //     allWoodPosts,
  //     activeArrow,
  //     fencePostMat,
  //     addFenceSings,
  //     addNewFenceMeshMat,
  //     sideAccesories,
  //     addNewFenceToSide,
  //     unselect,
  //     "kapija",
  //     getAbsPosX,
  //     getAbsPosZ
  //   );
  // };

  function toAddSingleStur(sturType, a, b) {
    sturType[activeFence].isVisible = true;
    foundationVisibilty(
      foundationStarts,
      foundations,
      false,
      foundationStartsVord,
      foundationsVord,
      a,
      foundationStartsRuck,
      foundationsRuck,
      b,
      activeFence + 1
    );
  }
  // let addSturmanker = document.getElementById("add-sturmanker");
  // addSturmanker.onclick = () => {
  //   sideAccesories.style.display = "none";
  //   addNewFenceToSide.style.display = "none";
  //   unselect(false);
  //   if (activeArrowSide == 2) {
  //     if (wholeFences[activeFence].rotation.y == 0) {
  //       toAddSingleStur(sturmankersVorderseiteRight, true, false);
  //     } else {
  //       toAddSingleStur(sturmankersRuckseiteRight, false, true);
  //     }
  //   }
  //   if (activeArrowSide == 3) {
  //     if (wholeFences[activeFence].rotation.y == 0) {
  //       toAddSingleStur(sturmankersRuckseiteRight, false, true);
  //     } else {
  //       toAddSingleStur(sturmankersVorderseiteRight, true, false);
  //     }
  //   }
  //   if (activeArrowSide == 1) {
  //     if (wholeFences[activeFence].rotation.y < 0) {
  //       toAddSingleStur(sturmankersVorderseiteRight, true, false);
  //     } else {
  //       toAddSingleStur(sturmankersRuckseiteRight, false, true);
  //     }
  //   }
  //   if (activeArrowSide == 4) {
  //     if (wholeFences[activeFence].rotation.y < 0) {
  //       toAddSingleStur(sturmankersRuckseiteRight, false, true);
  //     } else {
  //       toAddSingleStur(sturmankersVorderseiteRight, true, false);
  //     }
  //   }
  //   if (activeArrowSide == 5) {
  //     sturmankersVorderseite[0].isVisible = true;
  //     foundationVisibilty(
  //       foundationStarts,
  //       foundations,
  //       false,
  //       foundationStartsVord,
  //       foundationsVord,
  //       true,
  //       foundationStartsRuck,
  //       foundationsRuck,
  //       false,
  //       0
  //     );
  //   }
  //   if (activeArrowSide == 6) {
  //     sturmankersRuckseite[0].isVisible = true;
  //     foundationVisibilty(
  //       foundationStarts,
  //       foundations,
  //       false,
  //       foundationStartsVord,
  //       foundationsVord,
  //       false,
  //       foundationStartsRuck,
  //       foundationsRuck,
  //       true,
  //       0
  //     );
  //   }
  //   sturSelectionFun(sturmankersVorderseite, foundationStarts, foundations);
  //   sturSelectionFun(sturmankersRuckseite, foundationStarts, foundations);
  // };
  //   //ADD NEW FENCE SIDE BAR SETTINGS
  function addNewFenceSideBar() {
    removeSideAccesories(
      sideAccesories,
      deleteAccesorie,
      addFenceAcc,
      editPost,
      addNewFenceToSide
    );
    sideAccesories.style.display = "block";
    addNewFenceToSide.style.display = "block";

    // if (activeArrowSide == 1) {
    //   // if (!newFenceBackSigns[activeFence].isVisible) {
    //   if (
    //     (!newFenceLeftSigns[activeFence].isVisible ||
    //       !newFenceRightSigns[activeFence].isVisible) &&
    //     !sturmankersVorderseiteRight[activeFence].isVisible &&
    //     !sturmankersRuckseiteRight[activeFence].isVisible
    //   ) {
    //     addSturmanker.style.display = "flex";
    //   } else {
    //     addSturmanker.style.display = "none";
    //   }
    // }
    // if (activeArrowSide == 4) {
    //   // if (!newFenceForwardSigns[activeFence].isVisible) {
    //   if (
    //     (!newFenceLeftSigns[activeFence].isVisible ||
    //       !newFenceRightSigns[activeFence].isVisible) &&
    //     !sturmankersVorderseiteRight[activeFence].isVisible &&
    //     !sturmankersRuckseiteRight[activeFence].isVisible
    //   ) {
    //     addSturmanker.style.display = "flex";
    //   } else {
    //     addSturmanker.style.display = "none";
    //   }
    // }
    // if (activeArrowSide == 2) {
    //   // if (!newFenceLeftSigns[activeFence].isVisible) {
    //   if (
    //     (!newFenceForwardSigns[activeFence].isVisible ||
    //       !newFenceBackSigns[activeFence].isVisible) &&
    //     !sturmankersVorderseiteRight[activeFence].isVisible &&
    //     !sturmankersRuckseiteRight[activeFence].isVisible
    //   ) {
    //     addSturmanker.style.display = "flex";
    //   } else {
    //     addSturmanker.style.display = "none";
    //   }
    // }
    // if (activeArrowSide == 3) {
    //   // if (!newFenceRightSigns[activeFence].isVisible) {
    //   if (
    //     (!newFenceForwardSigns[activeFence].isVisible ||
    //       !newFenceBackSigns[activeFence].isVisible) &&
    //     !sturmankersVorderseiteRight[activeFence].isVisible &&
    //     !sturmankersRuckseiteRight[activeFence].isVisible
    //   ) {
    //     addSturmanker.style.display = "flex";
    //   } else {
    //     addSturmanker.style.display = "none";
    //   }
    // }
    // if (activeArrowSide == 5) {
    //   if (
    //     !sturmankersVorderseite[0].isVisible &&
    //     !sturmankersRuckseite[0].isVisible
    //   ) {
    //     addSturmanker.style.display = "flex";
    //   } else {
    //     addSturmanker.style.display = "none";
    //   }
    // }
    // if (activeArrowSide == 6) {
    //   if (
    //     !sturmankersVorderseite[0].isVisible &&
    //     !sturmankersRuckseite[0].isVisible
    //   ) {
    //     addSturmanker.style.display = "flex";
    //   } else {
    //     addSturmanker.style.display = "none";
    //   }
    // }
  }
  //CREATE SINGS FUNCTION
  var activeArrow = false;
  var activeArrowSide = false;
  function createNewFenceSign() {
    //FRONT SIGN
    const addNewFenceMesh = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMesh",
      {
        height: 0.01,
        diameter: 0.3,
        tessellation: 50,
      }
    );
    addNewFenceMesh.material = addNewFenceMeshMat;
    addNewFenceMesh.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]) + 0.3,
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1])
    );
    addNewFenceMesh.addRotation(Math.PI / 2, 0, 0);

    newFenceForwardSigns.push(addNewFenceMesh);
    //CREATE FENCE FORWARD
    for (let i = 0; i < newFenceForwardSigns.length; i++) {
      newFenceForwardSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceForwardSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 1;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceForwardSigns[i].material = addNewFenceMeshMatAct;
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
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
            document.getElementsByClassName("accTitle")[0].innerHTML =
              "einen Artikel hinzufügen";
          }
        )
      );
    }

    //RIGHT SIGHN
    var addNewFenceMeshRight = addNewFenceMesh.clone("addNewFenceMeshRight");
    addNewFenceMeshRight.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]),
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1]) - 0.3
    );
    addNewFenceMeshRight.addRotation(0, 0, -Math.PI / 2);
    newFenceRightSigns.push(addNewFenceMeshRight);
    //CREATE FENCE RIGHT
    for (let i = 0; i < newFenceRightSigns.length; i++) {
      newFenceRightSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceRightSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 2;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceRightSigns[i].material = addNewFenceMeshMatAct;
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
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
            document.getElementsByClassName("accTitle")[0].innerHTML =
              "einen Artikel hinzufügen";
          }
        )
      );
    }

    //LEFT SIGHN
    var addNewFenceMeshLeft = addNewFenceMesh.clone("addNewFenceMeshLeft");
    addNewFenceMeshLeft.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]),
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1]) + 0.3
    );
    addNewFenceMeshLeft.addRotation(0, 0, Math.PI / 2);
    newFenceLeftSigns.push(addNewFenceMeshLeft);
    //CREATE FENCE RIGHT
    for (let i = 0; i < newFenceLeftSigns.length; i++) {
      newFenceLeftSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceLeftSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 3;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceLeftSigns[i].material = addNewFenceMeshMatAct;
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
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
            document.getElementsByClassName("accTitle")[0].innerHTML =
              "einen Artikel hinzufügen";
          }
        )
      );
    }

    //BACK SIGHN
    var addNewFenceMeshBack = addNewFenceMesh.clone("addNewFenceMeshBack");
    addNewFenceMeshBack.position = new BABYLON.Vector3(
      getAbsPosX(rightPosts[rightPosts.length - 1]) - 0.3,
      1,
      getAbsPosZ(rightPosts[rightPosts.length - 1])
    );
    addNewFenceMeshBack.addRotation(0, Math.PI, 0);
    newFenceBackSigns.push(addNewFenceMeshBack);
    //CREATE FENCE BACK
    for (let i = 0; i < newFenceBackSigns.length; i++) {
      newFenceBackSigns[i].actionManager = new BABYLON.ActionManager(scene);
      newFenceBackSigns[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            activeArrow = i;
            activeArrowSide = 4;
            addNewFenceSideBar();
            addFenceSings.forEach((elm) => {
              elm.material = addNewFenceMeshMat;
            });
            newFenceBackSigns[i].material = addNewFenceMeshMatAct;
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
            newFenceForwardSigns[i].isVisible = true;
            newFenceRightSigns[i].isVisible = true;
            newFenceLeftSigns[i].isVisible = true;
            newFenceBackSigns[i].isVisible = true;
            intersectArrowSignsFence(
              fakeFences,
              newFenceForwardSigns,
              newFenceRightSigns,
              newFenceLeftSigns,
              newFenceBackSigns,
              activeFence,
              addFenceSings
            );
            rightPosts[i].material = selectedMat;
            document.getElementsByClassName("accTitle")[0].innerHTML =
              "einen Artikel hinzufügen";
          }
        )
      );
    }

    addFenceSings.push(
      addNewFenceMesh,
      addNewFenceMeshRight,
      addNewFenceMeshLeft,
      addNewFenceMeshBack
    );
    addFenceSings.forEach((elm) => {
      elm.isVisible = false;
    });
    //////////////////
  }

  function createMainPostSigns() {
    //RIGHT SIGHN MAIN POST
    const addNewFenceMeshRightMain = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMeshRightMain",
      {
        height: 0.01,
        diameter: 0.3,
        tessellation: 50,
      }
    );
    addNewFenceMeshRightMain.material = addNewFenceMeshMat;
    addNewFenceMeshRightMain.position = new BABYLON.Vector3(
      getAbsPosX(leftPosts[0]),
      1,
      getAbsPosZ(leftPosts[0]) - 0.3
    );
    addNewFenceMeshRightMain.addRotation(Math.PI / 2, 0, -Math.PI / 2);
    // newFenceRightSigns.push(addNewFenceMeshRightMain);
    addNewFenceMeshRightMain.actionManager = new BABYLON.ActionManager(scene);
    addNewFenceMeshRightMain.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
          activeArrow = false;
          activeArrowSide = 5;
          addNewFenceSideBar();
          addFenceSings.forEach((elm) => {
            elm.material = addNewFenceMeshMat;
          });
          addNewFenceMeshRightMain.material = addNewFenceMeshMatAct;
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
          addNewFenceMeshRightMain.isVisible = true;
          addNewFenceMeshLeftMain.isVisible = true;

          leftPosts[0].material = selectedMat;
          document.getElementsByClassName("accTitle")[0].innerHTML =
            "einen Artikel hinzufügen";
        }
      )
    );

    //LEFT SIGHN MAIN POST
    const addNewFenceMeshLeftMain = BABYLON.MeshBuilder.CreateCylinder(
      "addNewFenceMeshLeftMain",
      {
        height: 0.01,
        diameter: 0.3,
        tessellation: 50,
      }
    );
    addNewFenceMeshLeftMain.material = addNewFenceMeshMat;
    addNewFenceMeshLeftMain.position = new BABYLON.Vector3(
      getAbsPosX(leftPosts[0]),
      1,
      getAbsPosZ(leftPosts[0]) + 0.3
    );
    addNewFenceMeshLeftMain.addRotation(Math.PI / 2, 0, Math.PI / 2);
    // newFenceRightSigns.push(addNewFenceMeshLeftMain);
    addNewFenceMeshLeftMain.actionManager = new BABYLON.ActionManager(scene);
    addNewFenceMeshLeftMain.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function () {
          activeArrow = false;
          activeArrowSide = 6;
          addNewFenceSideBar();
          addFenceSings.forEach((elm) => {
            elm.material = addNewFenceMeshMat;
          });
          addNewFenceMeshLeftMain.material = addNewFenceMeshMatAct;
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
          addNewFenceMeshRightMain.isVisible = true;
          addNewFenceMeshLeftMain.isVisible = true;

          leftPosts[0].material = selectedMat;
          document.getElementsByClassName("accTitle")[0].innerHTML =
            "einen Artikel hinzufügen";
        }
      )
    );

    addFenceSings.unshift(addNewFenceMeshRightMain, addNewFenceMeshLeftMain);
    addFenceSings.forEach((elm) => {
      elm.isVisible = false;
    });
  }

  //SET NUMBER ON BEGINING
  let setNum = document.getElementsByClassName("set-num");
  for (let i = 0; i < setNum.length; i++) {
    setNum[i].innerHTML = i + 1;
  }

  //SET TITLE ACTIVNESS
  let clickableMainSec = document.getElementsByClassName(
    "set-part-click-title"
  );
  for (let i = 0; i < clickableMainSec.length; i++) {
    clickableMainSec[i].onclick = () => {
      if (clickableMainSec[i].className != "set-part-click-title clicked") {
        clickableMainSec[i].className = clickableMainSec[i].className.replace(
          " not-clicked",
          " clicked"
        );
        clickableMainSec[i].children[2].innerHTML = "-";
        clickableMainSec[i].nextElementSibling.style.height = "auto";
      } else if (
        clickableMainSec[i].className == "set-part-click-title clicked"
      ) {
        clickableMainSec[i].className = clickableMainSec[i].className.replace(
          " clicked",
          " not-clicked"
        );
        clickableMainSec[i].children[2].innerHTML = "+";
        clickableMainSec[i].nextElementSibling.style.height = 0;
      }
    };
  }

  //FUNCTION TO SET COLOR AND MATERIAL - 1, 2, 3, 5
  function setPartsAndconf(parts, changable, matCol) {
    for (let i = 0; i < parts.length; i++) {
      //set colors in badge
      parts[i].children[0].children[0].style.backgroundColor = matCol[i];
      parts[i].addEventListener("click", () => {
        //change fence color
        if (changable != false) {
          changable.diffuseColor = BABYLON.Color3.FromHexString(matCol[i]);
        }
      });
    }
  }

  //SET ACTIVNES
  //ACTIVE CHECKMARK
  // "active-text-color"
  let checkMark = "&#10003";
  //set activness style
  function setActivnesStyle(parts, partNum, i, actClass) {
    //change active singhts
    var currentActCol = document.getElementsByClassName(actClass);
    //add remove active chackmark
    currentActCol[partNum].children[2].innerHTML = "";
    parts[i].children[2].innerHTML = checkMark;
    //change active color
    currentActCol[partNum].className = currentActCol[partNum].className.replace(
      " " + actClass,
      ""
    );
    parts[i].className += " " + actClass;
  }

  function setActivnes(parts, partNum, actClass) {
    for (let i = 0; i < parts.length; i++) {
      parts[i].addEventListener("click", () => {
        setActivnesStyle(parts, partNum, i, actClass);
      });
    }
  }

  //1 SET MAIN FARBE FUNCIONALITY
  let mainFarbeParts = document.getElementsByClassName("set-part-main-farbe");
  let woodMaterialType = [0];
  //   setPartsAndconf(mainFarbeParts, false, fenceBoardsColors);
  setActivnes(mainFarbeParts, 1, "active-text-color");
  // mainFarbeParts[0].addEventListener("click", () => {
  //   allFences.forEach((element) => {
  //     element.forEach((elm) => {
  //       elm.material = woodMaterials[0];
  //     });
  //   });
  //   allWoodPosts.forEach((elm) => {
  //     elm.material = woodMaterials[0];
  //   });
  //   woodMaterialType[0] = 0;
  //   fencesArr.forEach((elm) => {
  //     elm.color = "grun";
  //   });
  // });
  // mainFarbeParts[1].addEventListener("click", () => {
  //   allFences.forEach((element) => {
  //     element.forEach((elm) => {
  //       elm.material = woodMaterials[1];
  //     });
  //   });
  //   allWoodPosts.forEach((elm) => {
  //     elm.material = woodMaterials[1];
  //   });
  //   woodMaterialType[0] = 1;
  //   fencesArr.forEach((elm) => {
  //     elm.color = "grau";
  //   });
  // });

  //2 SET PFOSTEN
  let holzType = document.getElementById("holzType");
  holzType.style.color = "#faa41a";
  let aluType = document.getElementById("aluType");
  let pfostenSecPart = document.getElementById("pfostenSecPart");
  let postType = 0;

  function setPhostenAct(a, b) {
    a.style.color = "#faa41a";
    b.style.color = "#000000";
    a.children[1].innerHTML = checkMark;
    b.children[1].innerHTML = "";
  }

  function setWholeFencePos(post) {
    if (post == rightPosts) {
      wholeFences[0].position.x -= 0.02;
    } else {
      wholeFences[0].position.x += 0.02;
    }

    for (let i = 1; i < wholeFences.length; i++) {
      if (fencesArr[i].status == "activeFence") {
        if (wholeFences[i].rotation.y == 0) {
          if (post == rightPosts) {
            //set whole fence position x
            wholeFences[i].position.x =
              getAbsPosX(post[fencesArr[i].parent]) + 0.97;
          } else {
            //set whole fence position x
            wholeFences[i].position.x =
              getAbsPosX(post[fencesArr[i].parent]) + 0.99;
          }
          //set whole fence position z
          wholeFences[i].position.z = getAbsPosZ(post[fencesArr[i].parent]);
        }
        if (wholeFences[i].rotation.y > 3) {
          if (post == rightPosts) {
            //set whole fence position x
            wholeFences[i].position.x =
              getAbsPosX(post[fencesArr[i].parent]) - 0.97;
          } else {
            //set whole fence position x
            wholeFences[i].position.x =
              getAbsPosX(post[fencesArr[i].parent]) - 0.99;
          }
          //set whole fence position z
          wholeFences[i].position.z = getAbsPosZ(post[fencesArr[i].parent]);
        }
        if (wholeFences[i].rotation.y < 0) {
          if (typeof fencesArr[i].parent != "undefined") {
            //set whole fence position x
            wholeFences[i].position.x = getAbsPosX(post[fencesArr[i].parent]);
            if (post == rightPosts) {
              //set whole fence position z
              wholeFences[i].position.z =
                getAbsPosZ(post[fencesArr[i].parent]) + 0.97;
            } else {
              //set whole fence position z
              wholeFences[i].position.z =
                getAbsPosZ(post[fencesArr[i].parent]) + 0.99;
            }
          }
        }
        if (wholeFences[i].rotation.y > 1 && wholeFences[i].rotation.y < 2) {
          if (typeof fencesArr[i].parent != "undefined") {
            //set whole fence position x
            wholeFences[i].position.x = getAbsPosX(post[fencesArr[i].parent]);
            if (post == rightPosts) {
              //set whole fence position z
              wholeFences[i].position.z =
                getAbsPosZ(post[fencesArr[i].parent]) - 0.97;
            } else {
              //set whole fence position z
              wholeFences[i].position.z =
                getAbsPosZ(post[fencesArr[i].parent]) - 0.99;
            }
          }
        }
        if (wholeFences[i].rotation.y < 0) {
          if (typeof fencesArr[i].parent == "undefined") {
            //set whole fence position x
            // wholeFences[i].position.x = getAbsPosX(post[0]);
            if (post == rightPosts) {
              //set whole fence position z
              wholeFences[i].position.z = getAbsPosZ(post[0]) + 0.97;
            } else {
              //set whole fence position z
              wholeFences[i].position.z = getAbsPosZ(post[0]) + 0.99;
            }
          }
        }
        if (wholeFences[i].rotation.y > 1 && wholeFences[i].rotation.y < 2) {
          if (typeof fencesArr[i].parent == "undefined") {
            //set whole fence position x
            // wholeFences[i].position.x = getAbsPosX(post[0]);
            if (post == rightPosts) {
              //set whole fence position z
              wholeFences[i].position.z = getAbsPosZ(post[0]) - 0.97;
            } else {
              //set whole fence position z
              wholeFences[i].position.z = getAbsPosZ(post[0]) - 0.99;
            }
          }
        }
      }
    }
    setSturmankerPosition(post);
  }

  function setPhostenType(a, b) {
    for (let i = 0; i < fencesArr.length; i++) {
      if (fencesArr[i].status == "activeFence") {
        roots[i + 1].isVisible = a;
        rightMetalParts[i].isVisible = b;
        rightSmallMetalParts[i].forEach((element) => {
          element.isVisible = b;
        });
        rightPosts[i].isVisible = a;
        rightWoodPosts[i].isVisible = b;
      }
    }
    roots[0].isVisible = a;
    metalParts[0].isVisible = b;
    smallMetalParts[0].forEach((element) => {
      element.isVisible = b;
    });
    allPosts[0].isVisible = a;
    allWoodPosts[0].isVisible = b;
    leftPostCapClones[0].isVisible = false;
    leftPostCaps[0].isVisible = false;

    rightPostCaps.forEach((elm) => {
      elm.isVisible = false;
    });
    rightPostCapClones.forEach((elm) => {
      elm.isVisible = false;
    });

    if (!a) {
      setWholeFencePos(rightWoodPosts);
    } else {
      setWholeFencePos(rightPosts);
    }
    checkPostIntersecting(
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
    if (b) {
      intersectionFunction(
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
    }
    setGround();
  }

  function setSturmankerPosition(post) {
    //set sturmankers position by post
    if (post == rightPosts) {
      for (let i = 0; i < sturmankersVorderseite.length; i++) {
        sturmankersVorderseite[i].position.y -= 0.011;
        sturmankersRuckseite[i].position.y += 0.01;
      }
    } else {
      for (let i = 0; i < sturmankersVorderseite.length; i++) {
        sturmankersVorderseite[i].position.y += 0.011;
        sturmankersRuckseite[i].position.y -= 0.01;
      }
    }
  }

  holzType.onclick = () => {
    if (postType == 1) {
      //turn on L-porfiles
      for (let i = 0; i < fencesArr.length; i++) {
        if (fencesArr[i].status == "activeFence") {
          if (fencesArr[i].type == "rhombus180180") {
            allLProfiles[i][0].forEach((elm) => {
              elm.isVisible = true;
            });
          }
          if (fencesArr[i].type == "rhombus90180") {
            allLProfiles[i][1].forEach((elm) => {
              elm.isVisible = true;
            });
          }
          if (fencesArr[i].type == "rhombus60180") {
            allLProfiles[i][2].forEach((elm) => {
              elm.isVisible = true;
            });
          }
          if (fencesArr[i].type == "rhombus150180") {
            allLProfiles[i][3].forEach((elm) => {
              elm.isVisible = true;
            });
          }
          if (fencesArr[i].type == "raRhombus60180") {
            allLProfiles[i][4].forEach((elm) => {
              elm.isVisible = true;
            });
          }
          if (fencesArr[i].type == "raRhombus50180") {
            allLProfiles[i][5].forEach((elm) => {
              elm.isVisible = true;
            });
          }
          if (fencesArr[i].type == "kapija") {
            allLprofilesComb.forEach((elm) => {
              elm.isVisible = false;
            });
          }
        }
      }
      setbefePfosten(1, 0.962, true, 1, 1.215, 0.524, 0.504);
      befePfostenSize = 0;
      setPhostenAct(holzType, aluType);

      pfostenSecPart.style.display = "none";
      postType = 0;
      setPhostenType(false, true);

      setActivnesStyle(befePfostenParts, 3, 0, "active-text-color");
    }
  };

  aluType.onclick = () => {
    if (postType == 0) {
      //turn off L-profiles
      allLprofilesComb.forEach((elm) => {
        elm.isVisible = false;
      });
      setPhostenAct(aluType, holzType);

      pfostenSecPart.style.display = "block";
      postType = 1;
      setPhostenType(true, false);

      if (leftPosts[0].scaling.z < 1) {
        leftPostCaps[0].isVisible = false;
      } else {
        leftPostCaps[0].isVisible = true;
      }

      for (let i = 0; i < rightPosts.length; i++) {
        if (rightPosts[i].scaling.z < 1) {
          rightPostCaps[i].isVisible = false;
        } else {
          rightPostCaps[i].isVisible = true;
        }
      }
    }
  };
  //set alu post color
  let fencePostsParts = document.getElementsByClassName(
    "set-part-farbe-pfosten"
  );
  setPartsAndconf(fencePostsParts, fencePostMat, fencePartsColors);
  setActivnes(fencePostsParts, 2, "active-text-color");

  //set alu post size
  let befePfostenParts = document.getElementsByClassName(
    "set-part-befe-pfosten"
  );
  setActivnes(befePfostenParts, 3, "active-text-color");

  function setbefePfosten(a, b, c, d, e, f, g) {
    //post roots
    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].isVisible) {
        roots[i].isVisible = c;
      }
    }
    if (
      fencesArr[0].type == "fionaKosaLeva" ||
      fencesArr[0].type == "fionaKosaLevaRupe"
    ) {
      leftPosts[0].scaling.z = f;
      leftPosts[0].position.y = g;
    } else {
      leftPosts[0].scaling.z = a;
      leftPosts[0].position.y = b;
    }
    for (let i = 0; i < fencesArr.length; i++) {
      if (
        fencesArr[i].type == "fionaKosaDesna" ||
        fencesArr[i].type == "fionaKosaDesnaRupe"
      ) {
        //////////////
        let childTypeSetPhosten = 0;
        for (let j = 0; j < fencesArr[i].children.length; j++) {
          if (
            fencesArr[fencesArr[i].children[j]].type != "fionaKosaLeva" &&
            fencesArr[fencesArr[i].children[j]].type != "fionaKosaLevaRupe"
          ) {
            childTypeSetPhosten += 1;
          }
        }
        ////////////
        if (childTypeSetPhosten == 0) {
          rightPosts[i].scaling.z = f;
          rightPosts[i].position.y = g;
        } else {
          rightPosts[i].scaling.z = a;
          rightPosts[i].position.y = b;
        }
      } else {
        rightPosts[i].scaling.z = a;
        rightPosts[i].position.y = b;
      }
    }
    if (sturmankersVorderseite[0].isVisible) {
      foundationVisibilty(
        foundationStarts,
        foundations,
        false,
        foundationStartsVord,
        foundationsVord,
        true,
        foundationStartsRuck,
        foundationsRuck,
        false,
        0
      );
    } else if (sturmankersRuckseite[0].isVisible) {
      foundationVisibilty(
        foundationStarts,
        foundations,
        false,
        foundationStartsVord,
        foundationsVord,
        false,
        foundationStartsRuck,
        foundationsRuck,
        true,
        0
      );
    } else {
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
        0
      );
    }

    //foundation
    for (let i = 0; i < foundations.length; i++) {
      foundations[i].scaling.y = d;
      foundationsVord[i].scaling.z = d;
      foundationsRuck[i].scaling.z = d;

      foundations[i].position.z = e;
      foundationsVord[i].position.z = e;
      foundationsRuck[i].position.z = e;
    }
  }
  var befePfostenSize = 0;
  if (befePfostenParts.length > 0) {
    befePfostenParts[0].addEventListener("click", () => {
      setbefePfosten(1, 0.962, true, 1, 1.215, 0.524, 0.504);
      befePfostenSize = 0;
    });
    befePfostenParts[1].addEventListener("click", () => {
      setbefePfosten(1.2, 0.7717, false, 1, 1.215, 0.724, 0.3119);
      befePfostenSize = 1;
    });
    befePfostenParts[2].addEventListener("click", () => {
      setbefePfosten(1.475, 0.511, false, 1.8, 1.415, 0.999, 0.053);
      befePfostenSize = 2;
    });
  }
  //single post size change
  let pfostensSingle = document.getElementsByClassName(
    "set-part-befe-pfosten-single"
  );
  function changeSinglePostSize(a, b, c, d, e, f, g) {
    for (let i = 0; i < rightPosts.length; i++) {
      if (rightPosts[i].material.id == "selectedMat") {
        if (
          fencesArr[i].type == "fionaKosaDesna" ||
          fencesArr[i].type == "fionaKosaDesnaRupe"
        ) {
          //////////////
          let childTypeSetPhosten = 0;
          for (let j = 0; j < fencesArr[i].children.length; j++) {
            if (
              fencesArr[fencesArr[i].children[j]].type != "fionaKosaLeva" &&
              fencesArr[fencesArr[i].children[j]].type != "fionaKosaLevaRupe"
            ) {
              childTypeSetPhosten += 1;
            }
          }
          ////////////
          if (childTypeSetPhosten == 0) {
            rightPosts[i].scaling.z = f;
            rightPosts[i].position.y = g;
          } else {
            rightPosts[i].scaling.z = a;
            rightPosts[i].position.y = b;
          }
        } else {
          rightPosts[i].scaling.z = a;
          rightPosts[i].position.y = b;
        }

        rightRoots[i].isVisible = c;

        foundations[i + 1].scaling.y = d;
        foundationsVord[i + 1].scaling.z = d;
        foundationsRuck[i + 1].scaling.z = d;

        foundations[i + 1].position.z = e;
        foundationsVord[i + 1].position.z = e;
        foundationsRuck[i + 1].position.z = e;
      }
    }
    if (leftPosts[0].material.id == "selectedMat") {
      if (
        fencesArr[0].type == "fionaKosaLeva" ||
        fencesArr[0].type == "fionaKosaLevaRupe"
      ) {
        leftPosts[0].scaling.z = f;
        leftPosts[0].position.y = g;
      } else {
        leftPosts[0].scaling.z = a;
        leftPosts[0].position.y = b;
      }
      roots[0].isVisible = c;

      foundations[0].scaling.y = d;
      foundationsVord[0].scaling.z = d;
      foundationsRuck[0].scaling.z = d;

      foundations[0].position.z = e;
      foundationsVord[0].position.z = e;
      foundationsRuck[0].position.z = e;
    }
  }
  pfostensSingle[0].addEventListener("click", () => {
    changeSinglePostSize(1, 0.962, true, 1, 1.215, 0.524, 0.504);
    setActivnesStyle(pfostensSingle, 0, 0, "active-text-color-single-pfosten");
  });
  pfostensSingle[1].addEventListener("click", () => {
    changeSinglePostSize(1.2, 0.7717, false, 1, 1.215, 0.724, 0.3119);
    setActivnesStyle(pfostensSingle, 0, 1, "active-text-color-single-pfosten");
  });
  pfostensSingle[2].addEventListener("click", () => {
    changeSinglePostSize(1.475, 0.511, false, 1.8, 1.415, 0.999, 0.053);
    setActivnesStyle(pfostensSingle, 0, 2, "active-text-color-single-pfosten");
  });

  //3 STURMANKER//////////////////
  let sturmankerCon = document.getElementsByClassName("sturmanker-con");
  setActivnes(sturmankerCon, 4, "active-text-color");
  function setSturmanker(a, b, c, d, e) {
    for (let i = 0; i < allPosts.length; i++) {
      // if (allPosts[i].isVisible) {
      sturmankersRuckseite[i].isVisible = a;
      sturmankersVorderseite[i].isVisible = b;

      foundationVisibilty(
        foundationStarts,
        foundations,
        c,
        foundationStartsVord,
        foundationsVord,
        d,
        foundationStartsRuck,
        foundationsRuck,
        e,
        i
      );
      // }
    }
  }
  if (sturmankerCon.length > 0) {
    var vorderseiteOn = false;
    var ruckseiteOn = false;
    var strurmOn = false;

    function sturmankerFunction(a, b, c, d, e, f, g) {
      modalFade.style.display = "block";
      onSturmanker.style.display = "block";
      setSturmanker(a, b, c, d, e);
      strurmOn = true;
      //set wich one is activ
      vorderseiteOn = f;
      ruckseiteOn = g;
    }
    sturmankerCon[0].addEventListener("click", () => {
      intersectionFunction(
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
      sturmankerFunction(true, false, false, false, true, false, true);
      //select stur
      sturSelectionFun(sturmankersRuckseite, foundationStarts, foundations);
    });
    sturmankerCon[1].addEventListener("click", () => {
      setSturmanker(false, false, true, false, false);
      //set wich one is active
      vorderseiteOn = false;
      ruckseiteOn = false;
      strurmOn = false;
    });
    sturmankerCon[2].addEventListener("click", () => {
      intersectionFunction(
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
      sturmankerFunction(false, true, false, true, false, true, false);
      //select stur
      sturSelectionFun(sturmankersVorderseite, foundationStarts, foundations);
    });
  }
  // to select sturmanker
  let selectedStur;
  let selectedFoundStart;
  let selectedFound;
  function sturSelectionFun(a, c, d) {
    for (let i = 0; i < a.length; i++) {
      a[i].actionManager = new BABYLON.ActionManager(scene);
      a[i].actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            if (a[i].material.id != "selectedMat") {
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
              a.forEach((elm) => {
                elm.material = sturmankerMat;
              });
              a[i].material = selectedMat;
              selectedStur = a[i];
              selectedFoundStart = c[i];
              selectedFound = d[i];
              sideAccesories.style.display = "block";
              deleteAccesorie[1].style.display = "block";
              addNewFenceToSide.style.display = "none";
            } else {
              a[i].material = sturmankerMat;
              sideAccesories.style.display = "none";
              deleteAccesorie[1].style.display = "none";
            }
          }
        )
      );
    }
  }

  //to delete sturmanker
  deleteImgAccesories[1].addEventListener("click", () => {
    sideAccesories.style.display = "none";
    deleteAccesorie[1].style.display = "none";
    addFenceAcc.style.display = "none";
    selectedStur.isVisible = false;
    if (sturmankersVorderseite.includes(selectedStur)) {
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
        sturmankersVorderseite.indexOf(selectedStur)
      );
    } else {
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
        sturmankersRuckseite.indexOf(selectedStur)
      );
    }

    selectedStur.material = sturmankerMat;
    //set activnes of sturmanker parts
    var sturNum2 = 0;
    for (let i = 0; i < sturmankersVorderseite.length; i++) {
      if (sturmankersVorderseite[i].isVisible) {
        sturNum2 += 1;
      } else if (sturmankersRuckseite[i].isVisible) {
        sturNum2 += 1;
      }
    }
    if (sturNum2 < 1) {
      setActivnesStyle(sturmankerCon, 4, 1, "active-text-color");
      strurmOn = false;
    }
  });
  //change sturmanker color
  //set alu post color
  let fenceSturmankerParts = document.getElementsByClassName(
    "set-part-farbe-sturmanker"
  );
  setPartsAndconf(fenceSturmankerParts, sturmankerMat, fencePartsColors);
  setActivnes(fenceSturmankerParts, 5, "active-text-color");

  //   // ACCESORIES SECTION FUNCTIONS*****************************************************************************************
  function unselect(activnesToFalse) {
    // sideAccesories.style.width = 0;
    sideAccesories.style.display = "none";
    for (let j = 0; j < deleteAccesorie.length; j++) {
      deleteAccesorie[j].style.display = "none";
    }
    addFenceAcc.style.display = "none";
    // closeSliderContainer();
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
    addFenceSings;
    if (activnesToFalse) {
      setTimeout(() => {
        activeFence = false;
      }, 100);
    }
  }
  function accCloseButFun(clickable) {
    if (typeof clickable.length == "number") {
      for (let i = 0; i < clickable.length; i++) {
        clickable[i].addEventListener("click", () => {
          unselect(true);
        });
      }
    } else {
      clickable.addEventListener("click", () => {
        unselect(true);
      });
    }
  }

  //set activnes for add fence
  let changeFence = document.getElementsByClassName(
    "set-activnes-change-fence"
  );
  setActivnes(changeFence, 0, "active-text-color");

  //close add new fence accesoire when close button
  accCloseButFun(sideAccCloseBtn);

  //   //FUNCTION  TO CHANGE FENCES
  function changeFenceFunction(c, d, h) {
    fencesArr[h].type = d;
    fencesArr[h].size = c;
    changePosAndScaleFence(c, h);
    positionChildrenOnParentSizeChange(h);

    allFences[h].forEach((elm) => {
      elm.isVisible = false;
    });
    kapijaPartsArr[h].isVisible = false;

    allLProfiles[h].forEach((elm) => {
      elm.forEach((element) => {
        element.isVisible = false;
      });
    });

    if (d == "rhombus180180") {
      rhombus180180Arr[h].isVisible = true;
      allLProfiles[h][0].forEach((elm) => {
        elm.isVisible = true;
      });
    }
    if (d == "rhombus90180") {
      rhombus90180Arr[h].isVisible = true;
      allLProfiles[h][1].forEach((elm) => {
        elm.isVisible = true;
      });
    }
    if (d == "rhombus60180") {
      rhombus60180Arr[h].isVisible = true;
      allLProfiles[h][2].forEach((elm) => {
        elm.isVisible = true;
      });
    }
    if (d == "rhombus150180") {
      rhombus150180Arr[h].isVisible = true;
      allLProfiles[h][3].forEach((elm) => {
        elm.isVisible = true;
      });
    }
    if (d == "raRhombus60180") {
      raRhombus60180Arr[h].isVisible = true;
      allLProfiles[h][4].forEach((elm) => {
        elm.isVisible = true;
      });
    }
    if (d == "raRhombus50180") {
      raRhombus50180Arr[h].isVisible = true;
      allLProfiles[h][5].forEach((elm) => {
        elm.isVisible = true;
      });
    }
    if (d == "kapija") {
      kapijaArr[h].isVisible = true;
      kapijaPartsArr[h].isVisible = true;
    }
    // //set ground size
    setGround();
  }

  // changeFence[0].addEventListener("click", () => {
  //   changeFenceFunction(180, "rhombus180180", activeFence);
  // });
  // changeFence[1].addEventListener("click", () => {
  //   changeFenceFunction(90, "rhombus90180", activeFence);
  // });
  // changeFence[2].addEventListener("click", () => {
  //   changeFenceFunction(60, "rhombus60180", activeFence);
  // });
  // changeFence[3].addEventListener("click", () => {
  //   changeFenceFunction(150, "rhombus150180", activeFence);
  // });
  // changeFence[4].addEventListener("click", () => {
  //   changeFenceFunction(60, "raRhombus60180", activeFence);
  // });
  // changeFence[5].addEventListener("click", () => {
  //   changeFenceFunction(50, "raRhombus50180", activeFence);
  // });
  // changeFence[6].addEventListener("click", () => {
  //   changeFenceFunction(100, "kapija", activeFence);
  // });
  // SINGLE FENCE EDITING
  //set activnes single fences
  let clickablePartSingleFence = document.getElementsByClassName(
    "set-part-click-title-single"
  );
  for (let i = 0; i < clickablePartSingleFence.length; i++) {
    clickablePartSingleFence[i].onclick = () => {
      if (
        clickablePartSingleFence[i].className !=
        "set-part-click-title-single clicked"
      ) {
        clickablePartSingleFence[i].className = clickablePartSingleFence[
          i
        ].className.replace(" not-clicked", " clicked");
        clickablePartSingleFence[i].children[1].innerHTML = "-";
        clickablePartSingleFence[i].nextElementSibling.style.height = "auto";
      } else if (
        clickablePartSingleFence[i].className ==
        "set-part-click-title-single clicked"
      ) {
        clickablePartSingleFence[i].className = clickablePartSingleFence[
          i
        ].className.replace(" clicked", " not-clicked");
        clickablePartSingleFence[i].children[1].innerHTML = "+";
        clickablePartSingleFence[i].nextElementSibling.style.height = 0;
      }
    };
  }

  // //BOARDS COLORS SINGLE FENCE 1
  // let boardsMatSingle = document.getElementsByClassName(
  //   "set-part-main-farbe-single"
  // );

  // setActivnes(boardsMatSingle, 0, "active-text-color-single");

  // boardsMatSingle[0].addEventListener("click", () => {
  //   fencesArr[activeFence].color = "grun";
  //   if (activeFence == 0) allWoodPosts[0].material = woodMaterials[0];
  // });
  // boardsMatSingle[1].addEventListener("click", () => {
  //   fencesArr[activeFence].color = "grau";
  //   if (activeFence == 0) allWoodPosts[0].material = woodMaterials[1];
  // });

  // //KAPIJA PARTS COLORS
  let kapijaPartsMatSingle = document.getElementsByClassName(
    "set-part-kapijaParts-farbe-single"
  );

  setActivnes(kapijaPartsMatSingle, 1, "active-text-color-single");

  kapijaPartsMatSingle[0].addEventListener("click", () => {
    kapijaPartsArr[activeFence].material = kapijaPartsMat1;
  });
  kapijaPartsMatSingle[1].addEventListener("click", () => {
    kapijaPartsArr[activeFence].material = kapijaPartsMat2;
  });
  kapijaPartsMatSingle[2].addEventListener("click", () => {
    kapijaPartsArr[activeFence].material = kapijaPartsMat3;
  });

  //CHANGE ALL FENCES TO BE SAME AS ACTIVE
  //change all fences same as this
  let changeAllFences = document.getElementById("changeAllFences");
  changeAllFences.onclick = () => {
    if (fencesArr[activeFence].type == "rhombus180180") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(180, "rhombus180180", i);
        }
      }
    }
    if (fencesArr[activeFence].type == "rhombus90180") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(90, "rhombus90180", i);
        }
      }
    }
    if (fencesArr[activeFence].type == "rhombus60180") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(60, "rhombus60180", i);
        }
      }
    }
    if (fencesArr[activeFence].type == "rhombus150180") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(150, "rhombus150180", i);
        }
      }
    }
    if (fencesArr[activeFence].type == "raRhombus60180") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(60, "raRhombus60180", i);
        }
      }
    }
    if (fencesArr[activeFence].type == "raRhombus50180") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(50, "raRhombus50180", i);
        }
      }
    }
    if (fencesArr[activeFence].type == "kapija") {
      for (let i = 0; i < fencesArr.length; i++) {
        if (activeFence != i && fencesArr[i].status != "disposedFence") {
          changeFenceFunction(100, "kapija", i);
        }
      }
    }

    // // change color of boards on all fences
    // if (fencesArr[activeFence].color == "grun") {
    //   allFences.forEach((element) => {
    //     element.forEach((elm) => {
    //       elm.material = woodMaterials[0];
    //     });
    //   });
    //   allWoodPosts.forEach((elm) => {
    //     elm.material = woodMaterials[0];
    //   });
    //   woodMaterialType[0] = 0;
    //   fencesArr.forEach((elm) => {
    //     elm.color = "grun";
    //   });
    //   setActivnesStyle(mainFarbeParts, 1, 0, "active-text-color");
    // }
    // if (fencesArr[activeFence].color == "grau") {
    //   allFences.forEach((element) => {
    //     element.forEach((elm) => {
    //       elm.material = woodMaterials[1];
    //     });
    //   });
    //   allWoodPosts.forEach((elm) => {
    //     elm.material = woodMaterials[1];
    //   });
    //   woodMaterialType[0] = 1;
    //   fencesArr.forEach((elm) => {
    //     elm.color = "grau";
    //   });
    //   setActivnesStyle(mainFarbeParts, 1, 1, "active-text-color");
    // }
    /////
  };
  //close when change all fences
  accCloseButFun(changeAllFences);
  //close side
  accCloseButFun(changeFence);
  //   ////////////////////////////////////////////////////////////////////////
  //DELETE FENCE
  let deleteFencePart = document.getElementById("set-part-fence-acc-del");

  function deleteFenceOn(a) {
    if (a > 0) {
      deleteFencePart.children[0].children[0].style.backgroundImage =
        "url('img/deleteRound.png')";
      deleteFencePart.children[1].innerHTML = "Löschen";
    } else {
      deleteFencePart.children[0].children[0].style.backgroundImage =
        "url('img/deleteRoundNo.png')";
      deleteFencePart.children[1].innerHTML = "Der erste Zaun";
    }
  }
  function deleteFence(a) {
    wholeFences[a].dispose();
    foundationsRight[a].dispose();
    fakeFences[a].name = "disposedFakeFence";
    fencesArr[a].status = "disposedFence";
    newFenceForwardSigns[a].dispose();
    newFenceRightSigns[a].dispose();
    newFenceLeftSigns[a].dispose();
    newFenceBackSigns[a].dispose();
    allPosts[a + 1].isVisible = false;
    allWoodPosts[a + 1].isVisible = false;
    fencesArr[a].children.forEach((elm) => {
      fencesArr[elm].parent = fencesArr[a].parent;

      fencesArr[fencesArr[a].parent].children.push(elm);
    });
    if (fencesArr[fencesArr[a].parent] != undefined) {
      fencesArr[fencesArr[a].parent].children.splice(
        fencesArr[fencesArr[a].parent].children.indexOf(a),
        1
      );
    }

    setGround();
    //visibility because of cart counting
    rightPosts[a].isVisible = false;
    rightWoodPosts[a].isVisible = false;

    roots[a + 1].isVisible = false;
    sturmankersRuckseite[a + 1].isVisible = sturmankersVorderseite[
      a + 1
    ].isVisible = false;

    rightMetalParts[a].isVisible = false;

    allLProfiles[a].forEach((elm) => {
      elm.forEach((element) => {
        element.isVisible = false;
      });
    });

    allFences[a].forEach((elm) => {
      elm.isVisible = false;
    });
    fencesArr[a].parent = undefined;

    intersectionFunction(
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
  }
  function recursiveToChildrenDelete(b) {
    if (fencesArr[b].children.length > 0) {
      fencesArr[b].children.forEach((elm) => {
        scaleToOtherFencesToDo(elm);
        recursiveToChildrenDelete(elm);
      });
    }
  }

  function recursiveToChildrenDelete2(c) {
    while (fencesArr[c].children.length > 0) {
      deleteFence(fencesArr[c].children[0]);
    }
  }

  function delFenFun(a) {
    if (fencesArr[a].children.length > 0) {
      firstX = getAbsPosX(rightPosts[a]);
      firstZ = getAbsPosZ(rightPosts[a]);
      if (fencesArr[a].parent != undefined) {
        secondX = getAbsPosX(rightPosts[fencesArr[a].parent]);
        secondZ = getAbsPosZ(rightPosts[fencesArr[a].parent]);
      } else {
        secondX = 0;
        secondZ = 0;
      }
      for (let i = 0; i < fencesArr[a].children.length; i++) {
        if (fencesArr[a].parent != undefined) {
          if (
            wholeFences[a].rotation.y !=
              wholeFences[fencesArr[a].parent].rotation.y ||
            wholeFences[a].rotation.y !=
              wholeFences[fencesArr[a].children[i]].rotation.y
          ) {
            recursiveToChildrenDelete2(a);
          } else {
            b = fencesArr[a].children[i];
            scaleToOtherFencesToDo(b);
            recursiveToChildrenDelete(b);
          }
        } else {
          recursiveToChildrenDelete2(a);
        }
      }
    }
  }
  accCloseButFun(deleteFencePart);
  ////////////////////////////////////////////////////////////
  //TAKE SCREENSHOT
  var screenshotBtn = document.getElementById("screenshot-but");
  screenshotBtn.onclick = () => {
    BABYLON.Tools.CreateScreenshot(engine, camera, 1024);
  };

  ////////////////////////////
  //LINK FOR CART
  var link = document.getElementById("link");
  link.onclick = () => {
    var a = document.getElementsByClassName("scCartList")[0].children;
    var prodIds = [];
    var prodValues = [];
    var linkParts = [];
    for (let i = 0; i < a.length; i++) {
      prodIds.push(
        a[i].children[0].children[1].children[0].innerHTML.split("/ ")[2]
      );
      prodValues.push(a[i].children[2].children[1].value);

      linkParts.push(prodIds[i] + ":" + prodValues[i] + ",");
    }
    linkParts = linkParts.join("");
    linkParts = linkParts.slice(0, -1);
    link.href += "?add-to-cart=" + linkParts;
  };

  //   /////////////////////////////////////SMART CART//////////////////////////////

  loadCart(
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
  );

  ///////////////////////////////////////////////////////////////CANVAS PLAN///////////////////////////////////////////////////////////////////

  draw2dPlan(
    allPosts,
    fencesArr,
    getAbsPosX,
    getAbsPosZ,
    rightPosts,
    rightWoodPosts,
    foundationsVord,
    foundationsRuck,
    foundations,
    foundationsRight,
    wholeFences
  );

  //   //end of scene
  return scene;
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //END OF SCENE

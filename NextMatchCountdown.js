// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: futbol;

const teamId = 133899;
const URL = "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=";
const TEAM_URL = URL + teamId;

const requestTeam = new Request(TEAM_URL);
const teamResponse = await requestTeam.loadJSON();

const widgetSize = config.widgetFamily;

const maxEvents = widgetSize === "large" ? 4 : 2;

const getTeamImg = async (id) => {
  let req = new Request(URL + id);
  let res = await req.loadJSON();
  let imageUrl = res.teams[0].strTeamBadge + "/preview";
  let imgReq = new Request(imageUrl);
  let img = await imgReq.loadImage();
  return img;
};

const createWidget = () => {
  let teamImg = await getTeamImg(teamId)
  const imageSize =  26;

  let widget = new ListWidget();

  widget.backgroundColor =  new Color("#2C2C2E", 1);

  let infoRowStack = w.addStack();
  infoRowStack.centerAlignContent();
  infoRowStack.addSpacer();

  let dateStack = infoRowStack.addStack();
  const dateFormatter = new DateFormatter();
  dateFormatter.useMediumDateStyle();
  dateFormatter.useShortTimeStyle();
  let parsedDate = new Date(Date.parse(e.strTimestamp));
  let formattedDate = dateFormatter.string(parsedDate);

  let date = dateStack.addText(formattedDate);
  date.font = Font.mediumSystemFont(10);
  date.textOpacity = 0.5;

  dateStack.addSpacer(10);

  widget.addSpacer();

  return widget;
};

const widget = await createWidget();

Script.setWidget(widget);
Script.complete();

await widget.presentLarge();

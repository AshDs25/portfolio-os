import About from "./about";
import Redirect from "./redirect";
import Skill from "./skill";
import Project from "./project";
import Help from "./help";
import Default from "./default";
import Themes from "./themes";
import ThemesComp from "./themesComp";

export const commands: Record<string, (arg?:string)=>React.ReactNode | void> = {
    "about":About,
    "git-hub":Redirect,
    "get-resume":() => {
        return <div>CV download started!</div>;
    },
    "get-linkedin":Redirect,
    "get-skills":Skill,
    "get-project":Project,
    "help":Help,
    "default":Default,
    "themes":Themes,
    "themesComp":(arg)=><ThemesComp val={arg}/>
}
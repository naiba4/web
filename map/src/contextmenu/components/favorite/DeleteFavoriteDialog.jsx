import {Dialog} from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TracksManager from "../../../context/TracksManager";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import React, {useContext} from "react";
import AppContext from "../../../context/AppContext";

export default function DeleteFavoriteDialog({dialogOpen, setDialogOpen}) {

    const ctx = useContext(AppContext);

    const toggleShowDialog = () => {
        setDialogOpen(!dialogOpen);
    };

    async function deleteFavorite() {
        for (let i = 0; i < ctx.selectedGpxFile.file.wpts.length; i++) {
            if (ctx.selectedGpxFile.file.wpts[i].name === ctx.selectedGpxFile.markerCurrent.title) {
                let result = await TracksManager.deleteFavorite(
                    ctx.selectedGpxFile.file.wpts[i],
                    ctx.selectedGpxFile.file.name,
                    ctx.favorites[ctx.selectedGpxFile.nameGroup].updatetimems)
                if (result) {
                    updateSelectedFile(result);
                    updateGroupMarkers();
                    closeContextMenu();
                    break;
                }
            }
        }
    }

    function updateSelectedFile(result) {
        ctx.selectedGpxFile.file.clienttimems = result.clienttimems;
        ctx.selectedGpxFile.file.updatetimems = result.updatetimems;
        Object.keys(result.data).forEach(t => {
            ctx.selectedGpxFile.file[`${t}`] = result.data[t];
        });
        ctx.selectedGpxFile.markerPrev = ctx.selectedGpxFile.markerCurrent;
        delete ctx.selectedGpxFile.markerCurrent;
        ctx.selectedGpxFile.editFavorite = true;
        ctx.setSelectedGpxFile({...ctx.selectedGpxFile});
    }

    function updateGroupMarkers() {
        delete ctx.favorites[ctx.selectedGpxFile.nameGroup].markers;
        ctx.setFavorites({...ctx.favorites});
    }

    function closeContextMenu() {
        setDialogOpen(false);
        ctx.setCurrentObjectType(null);
    }

    return (
        <Dialog open={true} onClose={toggleShowDialog}>
            <DialogTitle>Delete favorite</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Are you sure you want to delete ${TracksManager.prepareName(ctx.selectedGpxFile.markerCurrent.title)}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => deleteFavorite()}>
                    Delete</Button>
                <Button onClick={toggleShowDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
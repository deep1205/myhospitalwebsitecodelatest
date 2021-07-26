import React,{useState,useContext} from 'react';
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import  ListSubheader  from '@material-ui/core/ListSubheader';
import axios from 'axios';
import { AppContext } from '../../AppContext';

const useStyles=makeStyles((theme)=>({
    modal: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
     },
     paper:{
       backgroundColor: theme.palette.background.paper,
       width:'40%',
       border: '2px solid #000',
       boxShadow: theme.shadows[5],
     }
}))

const MyModal=(props)=>{
    const classes=useStyles()
    const {AssignData}=useContext(AppContext)
    const [bookedData,setBookedData]=AssignData
    const [assigned,setAssigned]=useState(false)

    const assignDriver=(driver)=>{
        console.log('RideId',props.rideData.RideId)
        console.log('driver ID',driver._id)
        console.log('pickUp Location',props.rideData.pickUplocation)

        axios.put('https://server.prioritypulse.co.in/hosp/assignDriver',{
            rideid:props.rideData.RideId,
            driverid:driver._id,
            pickUplocation:props.rideData.pickUplocation
    },
    {headers: { Authorization: localStorage.getItem("token")}},    
    )
        .then(({data})=>{
            setAssigned(true)
            setBookedData({
                name:data['ride'].name,
                pcase:data['ride'].pcase,
                age:data['ride'].age,
                guardianNo:data['ride'].guardianNo,
                casePrior:data['ride'].casePrior,
                pickedBy:driver,
                pickUplocation:data['ride'].pickUplocation
            })
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <Modal 
            open={props.modal}
            onClose={props.modalClose}
            className={classes.modal}
            >
    <Fade in={props.modal}>
        <div className={classes.paper}>
            <List>
                <ListSubheader>
                            <div style={{marginLeft:'5px',fontWeight:'500',color:'black'}}>Select one of Drivers</div>
                </ListSubheader>
                {
                    props.activeDrivers.length===0?
                    <div style={{textAlign:'center',fontWeight:'500'}}>Sorry,No driver is available</div>
                    :
                    props.activeDrivers.map(driver=>{
                        return (
                            <ListItem divider={true}>
                                <ListItemText
                                primary={
                                    <Typography>
                                        <div style={{fontWeight:'600'}}>{driver.name}</div>
                                    </Typography>
                                }
                                />
                                <ListItemSecondaryAction>
                                   {
                                       assigned===false?
                                       (<Button variant='contained' onClick={()=>assignDriver(driver)} color='primary'>Assign</Button>)
                                       :
                                       null
                                   } 
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    </Fade>
          </Modal>
    )
}
export default MyModal
import React,{useState,Fragment,useRef,useEffect,useContext} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//Mui stuff
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import MyModal from './Modal.js'
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import  ListSubheader  from '@material-ui/core/ListSubheader';
import io from "socket.io-client";
import axios from 'axios';
import { AppContext } from '../../AppContext.js'

const useStyles = makeStyles((theme) => ({
    root:{
        textDecoration:'None',
        width:'36ch',
        maxHeight:'90vh',
        overflowY:'auto',
        backgroundColor:'white',
   },
   subheader:{
       padding:'12px 0px',
   },
   listitem:{
       
   },
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
}));

const Notifications=(props)=>{
    const notifyendpoi='https://server.prioritypulse.co.in/notifications'
    const notifySocket=io(notifyendpoi)

    const classes=useStyles()
    const anchorRef=useRef(null)
    const [open,setOpen]=useState(false)
    const {notificationData}=useContext(AppContext)
    const [notifications,setNotifications]=notificationData;
    const [modal,setModal]=useState(false)
    const [activeDrivers,setActiveDrivers]=useState([])
    const [rideData,setRideData]=useState([])

    const modalOpen=(rData)=>{
       setModal(true)
       setRideData(rData)

       axios
      .get("https://server.prioritypulse.co.in/hosp/hospitalActiveDriver", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setActiveDrivers(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    }

    const modalClose=()=>{
        setModal(false)
    } 

    const handleOpen=(event)=>{
        setOpen(!open)
    }

    const handleClose=(event)=>{
        setOpen(false)
    }

    dayjs.extend(relativeTime)

    useEffect(()=>{
        notifySocket.emit('join',{'roomid':localStorage.getItem("id")})
        notifySocket.on("message",(res)=>{
            console.log('message',res)
        })
        notifySocket.on('notifications',(res)=>{
            console.log('notifications',res)
            setNotifications((notify)=>[...notify,res])
        })
    },[notifySocket])

    useEffect(()=>{
        axios.get('https://server.prioritypulse.co.in/hosp/getNotifications',{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
          })
          .then((res)=>{
              setNotifications(res['data'])
              console.log(res)
          })
    },[])

    let notificationsIcons;
    if(notifications && notifications.length>0){
        notifications.filter(not=>not.isSeen===false).length>0
        ?(notificationsIcons=(
            <Badge badgeContent={notifications.filter((not)=>not.isSeen===false).length}
            color='secondary'>
                <NotificationsIcon style={{color:'white'}} />
            </Badge>
        ))
        :(
            notificationsIcons=<NotificationsIcon />
        )
    }
    else{
        notificationsIcons=<NotificationsIcon />
    }
    const notificationsMarkup=notifications && notifications.length>0?(
        notifications.map((not)=>{
            const time=dayjs(not.createdOn).fromNow()
            const iconColor=!not.isSeen?"primary":"secondary"
            return(
                <ListItem button={true} divider={true} alignItems='flex-start' selected={!not.isSeen?true:false} className={classes.listitem}>
                    <ListItemText>
                        <Typography>
                            {
                            not['messageType']==='ride'?
                                not['rideData']?
                            (
                                <>
                                <div style={{display:'flex',justifyContent:'space-between'}}><div style={{fontWeight:'600'}}>{not['rideData'].name} booked the ride</div> <div style={{fontWeight:'lighter'}}>{time}</div></div>
                                <div>Case:{not['rideData'].pcase}</div>
                                <div>Priority:{not['rideData'].casePrior}</div>
                                <div style={{ marginTop:'5px',display:'flex',justifyContent:'space-around'}}>
                                    <Button variant='contained' onClick={()=>modalOpen(not['rideData'])} color='primary'>Accept</Button>
                                    <Button variant='contained' onClick={modalOpen} color='secondary'>Reject</Button>
                                </div>
                                </>
                            )
                            :
                                (
                                    <div>Ride is Already assigned</div>
                                )
                                :
                                (
                                    <div>Driver Requested the ride</div>
                                )       
                            }
                        </Typography>
                    </ListItemText>
                </ListItem>
            )
        })
    ):(
        <MenuItem onClick={handleClose}>
            You have no notification yet
        </MenuItem>
    )

    return (
        <Fragment>
            <MyModal
            modal={modal}
            modalClose={modalClose}
            activeDrivers={activeDrivers}
            rideData={rideData}
            />
            <Tooltip placement='top' title='Notifications'>
                <IconButton
                ref={anchorRef}
                aria-haspopup="true"
                aria-controls={open?'menu-list-grow':undefined}
                onClick={handleOpen}
                >
                    {notificationsIcons}
                </IconButton>
            </Tooltip>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='left-end' transition disablePortal>
                {({transitionProps})=>(
                    <Paper elevation={12}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <List className={classes.root} id='menu-list-grow' subheader={<ListSubheader />}>
                            <ListSubheader color='inherit' className={classes.subheader}>
                                <ListItemText>
                                    <h6 style={{marginLeft:'16px'}}>Notifications</h6>
                                </ListItemText>
                            </ListSubheader>
                            {notificationsMarkup}
                        </List>
                    </ClickAwayListener>
                    </Paper>
                )}        
          </Popper>
        </Fragment>
    )
}
export default Notifications


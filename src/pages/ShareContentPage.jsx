import React, { useRef, useState, useEffect } from 'react';
import { VStack, Flex, Box, Text, Button, Image, useBreakpointValue } from '@chakra-ui/react';
import { useData } from '../App';
import { QRCodeCanvas } from "qrcode.react";
import { fetchUserData } from '../Dashboards/UserProfile';
import { currentUserId } from '../Utilities/firebase';

const ShareContentPage = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const {  getUserProfilePageURL } = useData

    const isSmallScreen = useBreakpointValue({ base: true, md: false });


    useEffect(() => {
        const videoUrl = "https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusic_Musical_Movie_01.mp4?alt=media&token=381bebdf-f683-4514-bdb3-00284d9d3d7f";
        setVideoUrl(videoUrl); // Directly set the URL to the state
      }, []);

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };


    const enterFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
        }
    };



    const qrRef = useRef(null);



    const [userData, setUserData] = useState(null); // State to hold user data

    const [qrValue, setQrValue] = useState(""); 
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchUserData(currentUserId); // Fetch user data using the utility function
                setUserData(data); // Set the fetched data to state
            } catch (err) {
                console.error(err);
            }
        };

        if (currentUserId) {
            getData(); // Call the function to fetch the data if the UID exists
        }
    }, [currentUserId]);
    
                                                            
  
    useEffect(() => {
        if (userData?.username) {
            setQrValue(`https://puremusic.live/video/watch=hYp8Cf2kmeJwgf2dL_user=${encodeURIComponent(userData.username)}`);
        
        }
    }, [userData]);

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas");
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `QRCode_${userData.username}.png`;
        link.click();
    };



    return (

        <Flex
            flexDirection={{ base: "column", md: "row" }} // Stack on mobile, row on larger screens
            align="center"
            justify="center"
            gap="2rem" // Adds spacing between video & QR code
            p="2rem"
        >
            <VStack>


                <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto' }}>
                    {videoUrl ? (
                        <>
                            <video
                                ref={videoRef}
                                width="100%"
                                controls={false}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                controlsList="nodownload nofullscreen noremoteplayback"
                                style={{ position: 'relative', zIndex: 0, borderRadius: '10px' }}
                                onClick={enterFullscreen}
                            >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Play Button */}
                            {!isPlaying && (
                                <div
                                    onClick={handlePlayClick}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        borderRadius: '8px',
                                        border: '2px solid white',
                                        height: '50px',
                                        width: '150px',
                                        cursor: 'pointer',
                                        color: 'white',
                                        fontSize: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 2,
                                    }}
                                >
                                    <p>Play Now</p>
                                </div>
                            )}

                            {/* Show Thumbnail Image when the video is paused */}
                            {!isPlaying && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: '100%',
                                        background: `url("/MusicalMovie01Thumbnail.jpg") no-repeat center center/cover`,
                                        backgroundSize: 'cover',
                                        zIndex: 1,
                                    }}
                                ></div>
                            )}
                        </>
                    ) : null}
                </div>
            </VStack>



            {/* QR Code Section */}
            <VStack align="center">

                {isSmallScreen && (
                    <>
                        <Text fontSize="lg" fontWeight="500" textColor="gray.700">
                            Welcome to PureMusic
                        </Text>
                        <Image
                            src="/PureMusicLogo.jpeg"
                            borderRadius='full'
                            width="60px"
                            maxH="50px"
                            className="profile-image-circle"
                            alt='puremusic logo'

                        />
                    </>
                )}
                <Text fontSize="16px" fontWeight="bold">
                    Scan to watch video
                </Text>
                <Box ref={qrRef} border="2px solid #05c7d0" borderRadius="8px" p="10px">
                    <QRCodeCanvas value={qrValue} size={200} />
                </Box>
                <Button onClick={downloadQRCode} mt="5px" variant="outline"
                    size="sm"
                    bg="white"
                    color="#05c7d0" // Website color for text
                    border="2px solid #05c7d0" // Border to match the website color
                    px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
                    _hover={{
                        bg: "#05c7d0", // Button background turns to website color on hover
                        color: "white", // White text when hovering
                        borderColor: "#06e4ed", // Keep border color same as background color
                        transform: "scale(1.05)", // Slightly grow button on hover
                        transition: "0.3s ease", // Smooth transition for hover effect
                    }}
                    _active={{
                        transform: "scale(1.02)", // Slight scale on click
                        boxShadow: "none", // Remove shadow on active state
                    }}
                    _focus={{
                        outline: "none", // Remove outline on focus
                    }}>
                    Download QR Code
                </Button>
            </VStack>

        </Flex>
    );
};


{/*
              <Flex alignItems="center" justifyContent="center" flexDirection="row"     mb="1rem" >
  <Image
    src={"Artists1.jpg"}
    alt={name}
    borderRadius="full"
    boxSize="50px"
    mr={4}

  />
  
    <Text fontSize="16px" color="white">
      Nathanael Fra
    </Text>

            </Flex> */}

export default ShareContentPage
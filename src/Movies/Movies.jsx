import React, { useRef, useState, useEffect } from 'react';
import { Button, Text, Flex, Image, VStack } from '@chakra-ui/react';
import { fetchVideoUrl } from './videos';
import { tipWaiter } from '../Utilities/stripe';

const Movies = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [showTipBox, setShowTipBox] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null); // Fullscreen wrapper

  
  
    useEffect(() => {
      const videoUrl = "https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusic_Musical_Movie_01.mp4?alt=media&token=381bebdf-f683-4514-bdb3-00284d9d3d7f";
      setVideoUrl(videoUrl); // Directly set the URL to the state
    }, []);

     
   
    
  
   
  
   
  
    const handlePlayClick = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 59; // Start at 59 seconds
          videoRef.current.play();
          setIsPlaying(true);
        }
      };
  
    const handleTip = (amount) => {
      console.log(`User tipped: $${amount}`);
      
      tipWaiter(amount)
        .then((paymentSuccess) => {
          if (paymentSuccess) {
           
          } else {
            // Handle payment failure (if needed)
            console.log('Payment failed or was canceled.');
          }
        })
        .catch((error) => {
          // Handle any errors that occurred in the payment process
          console.log('Payment initiation error:', error);
        });
    };
  
  
    const enterFullscreen = () => {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    };
  
    return (
      <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto' }}>
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              width="100%"
              controls={false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controlsList="nodownload nofullscreen noremoteplayback" // Removes the gray fullscreen button
              style={{ position: 'relative', zIndex: 0, borderRadius: '10px' }}
              onClick={enterFullscreen} // Enter fullscreen properly
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
  
            {/* Play Button */}
            {!isPlaying && !showTipBox && (
              <>
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
                    width: '220px', // Increase width for better spacing
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    letterSpacing: '1px', // Improve readability
                    whiteSpace: 'nowrap', // Prevent text wrapping
                    zIndex: 2,
                  }}
                >
                  <p>Continue Watching</p>
                </div>
  
              </>
            )}
  
            {/* Show Thumbnail Image when the video is paused */}
            {!isPlaying && !showTipBox && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  borderRadius: '8px',
                  width: '100%',
                  height: '100%',
                  background: `url("/MusicalMovie01Thumbnail.jpg") no-repeat center center/cover`,  // Thumbnail from public folder
                  backgroundSize: 'cover',
                  zIndex: 1,
                }}
              ></div>
            )}
  
            {/* Tip Overlay */}
            {showTipBox && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  zIndex: 3,
                  minWidth: '300px',
                }}
              >
                <Text color="white" fontWeight="bold" fontSize={{ base: "14px", md: "16px", lg: "18px" }} marginBottom="20px">
                Tip this artist, if you enjoy the experience!
                </Text>
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
  
  
                <Button onClick={() => handleTip(10)} bg="#04b6c3" color="white" m="2" size={{ base: "sm", sm: "sm", md: "md" }} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}>Tip $10</Button>
                <Button onClick={() => handleTip(15)} bg="#04b6c3" color="white" m="2" size={{ base: "sm", sm: "sm", md: "md" }} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}>Tip $15</Button>
                <Button onClick={() => handleTip(25)} bg="#04b6c3" color="white" m="2" size={{ base: "sm", sm: "sm", md: "md" }} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}>Tip $25</Button>
                <Button onClick={() => handleTip(50)} bg="#04b6c3" color="white" m="2" size={{ base: "sm", sm: "sm", md: "md" }} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}>Tip $30</Button>
                <Button onClick={() => handleTip(50)} bg="#04b6c3" color="white" m="2" size={{ base: "sm", sm: "sm", md: "md" }} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}>Tip $50</Button>
                <Button onClick={() => handleTip(50)} bg="#04b6c3" color="white" m="2" size={{ base: "sm", sm: "sm", md: "md" }} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}>Tip $100</Button>
  
                <Text color="white" fontWeight="bold" fontSize={{ base: "12px", md: "14x", lg: "14px" }}>
                 Thank this artists with your tip.
                </Text>
              </div>
            )}
          </>
        ) : (
  
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: `url("/MusicalMovie01Thumbnail.jpg") no-repeat center center/cover`,
              backgroundSize: 'cover',
              zIndex: 1,
            }}
  
  
  
          ></div>
  
  
  
        )}
      </div>
    );
  
}

export default Movies
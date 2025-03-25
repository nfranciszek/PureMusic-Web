import React, { useRef, useState, useEffect } from 'react'
import { VStack, Center, Flex, Image, Button, Text } from '@chakra-ui/react'
import { fetchVideoUrl } from '../Movies/videos';
const WelcomePage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);  // Track whether the video is playing
  const videoRef = useRef(null);  // R
  const [isPausedForTips, setIsPausedForTips] = useState(false); // Track if video paused for tips


  useEffect(() => {
    const interval = setInterval(() => {
      // if (videoRef.current && videoRef.current.currentTime >= 600) { // 600 seconds = 10 minutes
      if (videoRef.current && videoRef.current.currentTime >= 30) { // 600 seconds = 10 minutes
        videoRef.current.pause();
        setIsPausedForTips(true);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);


  useEffect(() => {
    fetchVideoUrl("gs://puremusic-d8ee8.firebasestorage.app/ChopinPreludeOp28No4.mp4").then((url) => {
      if (url) setVideoUrl(url);
    });
  }, []);

  const handlePlayClick = () => {
    videoRef.current.play();  // Play the video
    setIsPlaying(true);  // Set state to playing
  };

  const handlePause = () => {
    setIsPlaying(false);  // Set state to not playing
  };

  const handleTip = (amount) => {
    console.log(`User tipped: $${amount}`);
    setIsPausedForTips(false);  // Hide tip options after tipping
    videoRef.current.play();  // Resume video after tipping
  };

  const handleCustomTip = () => {
    const customAmount = prompt("Enter your custom tip amount:");
    if (customAmount) {
      console.log(`User tipped: $${customAmount}`);
      setIsPausedForTips(false);  // Hide tip options after tipping
      videoRef.current.play();  // Resume video after tipping
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {videoUrl ? (
        <>
          <video
            ref={videoRef}
            width="100%"
            controls={false}  // Disable default controls
            onPlay={() => setIsPlaying(true)}  // Track when the video starts
            onPause={handlePause} // Track when the video pauses
            style={{ position: 'relative', zIndex: 0 }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Show Play Button when the video is paused */}
          {!isPlaying && !isPausedForTips && (
            <div
              onClick={handlePlayClick}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                fontSize: '20px',
                zIndex: 2, // Ensure it's above everything
              }}
            >
              <p>Play Now</p>
            </div>
          )}

          {/* Show Thumbnail Image when the video is paused */}
          {!isPlaying && !isPausedForTips && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: `url("/MusicalMovie01Thumbnail.jpg") no-repeat center center/cover`,  // Thumbnail from public folder
                backgroundSize: 'cover',
                zIndex: 1,
              }}
            ></div>
          )}

          {/* Show Tip Options when the video is paused after 10 minutes */}
          {isPausedForTips && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '30px',
                borderRadius: '10px',
                textAlign: 'center',
                zIndex: 3, // Make sure the tips are above everything
                minWidth: '300px', // Set minimum width to 100px
              }}
            >
              <Text
                color="white"
                fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "24px" }}
                marginBottom="20px"
              >
                Tip this artist now to continue watching!
              </Text>
              <div>
                <Button onClick={() => handleTip(10)} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">
                  Tip $10
                </Button>
                <Button onClick={() => handleTip(15)} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">
                  Tip $15
                </Button>
                <Button onClick={() => handleTip(25)} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">
                  Tip $25
                </Button>
                <Button onClick={() => handleTip(30)} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">
                  Tip $30
                </Button>
                <Button onClick={() => handleTip(50)} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">
                  Tip $50
                </Button>
                <Button onClick={() => handleTip(100)} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">
                  Tip $100
                </Button>
                <Button onClick={handleCustomTip} bg="#04b6c3" color="white" size={{ base: "sm", sm: "sm", md: "md", lg: "lg" }}
                  mt={4} _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3", }}
                  _focus={{ border: "none" }} m="2">

                  Custom Tip
                </Button>
              </div>


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
            background: `url("/MusicalMovie01Thumbnail.jpg") no-repeat center center/cover`, // Thumbnail from public folder
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        ></div>
      )}
    </div>
  );
};


export default WelcomePage

{/*}
        <Flex direction="column" align="center" justify="center" height="100vh" width="100vw">
          <Image src="/PureMusicLogo.jpeg" alt="Pure Music Logo" maxH="70px" mb="3rem" />
          <p>Loading video...</p>
        </Flex>
    */}
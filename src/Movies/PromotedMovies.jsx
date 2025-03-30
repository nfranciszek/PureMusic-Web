import React, { useRef, useState, useEffect } from 'react';
import { Button, Text, Flex, Image, VStack, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../App';
const PromotedMovies = () => {
 
  const [videoUrl, setVideoUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPausedForTips, setIsPausedForTips] = useState(false);
  const [tipAmount, setTipAmount] = useState("");

  const [hideLogo, setHideLogo] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null); // Fullscreen wrapper

  const navigate = useNavigate();

  const { setSignUpAsFan, setSignUpAsArtist, setSignUpAsPromoter,

    finalTipAmount, setFinalTipAmount,
    TimeStopVideoForTips,
} = useData();
  const goToSignUp = () => {

    setSignUpAsFan(true);
    setSignUpAsArtist(false);
     setSignUpAsPromoter(false);
    navigate("/signup");

  }

  useEffect(() => {
    const videoUrl = "https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusic_Musical_Movie_01.mp4?alt=media&token=381bebdf-f683-4514-bdb3-00284d9d3d7f";
    setVideoUrl(videoUrl); // Directly set the URL to the state
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && videoRef.current.currentTime >= TimeStopVideoForTips) {
        videoRef.current.pause();
        setIsPausedForTips(true);


        // exitting full screen for tip 
        // Ensure the video is fullscreen on all platforms before exiting
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
          // Exit fullscreen on supported browsers
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { // Safari for iOS
            document.webkitExitFullscreen();
          }
        }


      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayClick = () => {
    videoRef.current.play();
    setIsPlaying(true);
    setHideLogo(true);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && videoRef.current.currentTime >= 5) {
      setHideLogo(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tipAmount) {
      setFinalTipAmount(tipAmount);
    }
  }, [tipAmount]);
  
  // Log the finalTipAmount when it changes
  useEffect(() => {
    console.log("final tip amount is", finalTipAmount);
  }, [finalTipAmount]);
 


  const enterFullscreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen();
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen();
    }
  };

  const DonorboxEmbed = ({ amount }) => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://donorbox.org/widget.js";
      script.setAttribute("paypalExpress", "false");
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    return (
      <iframe
        src={`https://donorbox.org/embed/puremusic-artists-${amount}?default_interval=o&amount=${amount}`}
        name="donorbox"
        allowpaymentrequest="allowpaymentrequest"
        seamless="seamless"
        frameBorder="0"
        scrolling="no"
        height="900px"
        width="100%"
        style={{ maxWidth: "500px", minWidth: "250px", maxHeight: "none !important" }}
        allow="payment"
      ></iframe>
    );
  };
  

  return (

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
            controlsList="nodownload nofullscreen noremoteplayback" // Removes the gray fullscreen button
            style={{ position: 'relative', zIndex: 0, borderRadius: '10px' }}
            onClick={enterFullscreen} // Enter fullscreen properly
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play Button */}
          {!isPlaying && !isPausedForTips && (
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
                  width: '150px', // Adjust width as needed
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

            </>
          )}

          {/* Show Thumbnail Image when the video is paused */}
          {!isPlaying && !isPausedForTips && (
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

          {!tipAmount ? (
            <>
          {isPausedForTips && (
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
              Tip this artist to access the full performance.
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


<Flex wrap="wrap"   justify="center"  
    align="center"   gap={2}>
          {[10, 15, 25, 30, 50, 100].map((amount) => (
            <Button
              key={amount}
              onClick={() => setTipAmount(amount)}
              bg="#04b6c3"
              color="white"
              m="2"
              size={{ base: "sm", sm: "sm", md: "md" }}
              _hover={{ bg: "white", color: "#04b6c3", border: "2px solid #04b6c3" }}
            >
              Tip ${amount}
            </Button>
          ))}
        </Flex>

              <Text color="white" fontWeight="bold" fontSize={{ base: "12px", md: "14x", lg: "14px" }}>
               Unlock the full musical movie with your tip.
              </Text>
            </div>

          )}

</>
          ) : (
            <>
<Box
  style={{
    flex: 1,
    zIndex: 5, // This should be above the overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'absolute', // Make sure it's absolutely positioned
    top: '90%', // Adjust this to move it lower
    left: '50%',
    width: '80%', 
    transform: 'translate(-50%, -50%)',
  }}
>
  <DonorboxEmbed amount={tipAmount} />
</Box>

</>
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

    {!hideLogo  && (
<>
    <Text fontSize="24px" fontWeight="600"> Welcome to PureMusic</Text>
    <Image
                      src="/PureMusicLogo.jpeg"
                      borderRadius='full'
                      width="90px"
                      maxH="70px"
                      className="profile-image-circle"
                      alt='puremusic logo'
           
     />
     </>
    )}

    <Flex justify="center" mt={3} flexDirection="column" >
  




</Flex>
</VStack>


  );
};


export default PromotedMovies

    import React, { useRef, useState, useEffect } from 'react';
    import { Button, Text, Flex, Image, VStack, Box, Heading, UnorderedList, ListItem, HStack } from '@chakra-ui/react';
    import { fetchVideoUrl } from '../Movies/videos';
    import { tipWaiter } from '../Utilities/stripe';
    import { useNavigate } from 'react-router-dom';
    import { useData } from '../App';
    const GentleMusicPage = () => {
    
      const [mainVideoUrl, setMainVideoUrl] = useState("/Piano_playing_Is_silent.mp4");
    
      const [videoUrl, setVideoUrl] = useState("");
      const [isPlaying, setIsPlaying] = useState(false);
      const [isPausedForTips, setIsPausedForTips] = useState(false);
      const [tipAmount, setTipAmount] = useState("");
    
      const [hideLogo, setHideLogo] = useState(false);
      const [showLearnMore, setShowLearnMore] = useState(false);
    
      const { TimeStopVideoForTips } = useData();
    
      const videoRef = useRef(null);
      const containerRef = useRef(null); // Fullscreen wrapper
    
      const navigate = useNavigate();
    
      const goToPromoterPage = () => {
        navigate("/promoter-program");
      }
    
   
      const goToGeneralEvents = () => {
    
        navigate('/gentle-music/events');
    
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
      };
     
    
      useEffect(() => {
        const videoUrl = "https://firebasestorage.googleapis.com/v0/b/puremusic-d8ee8.firebasestorage.app/o/PureMusic_Musical_Movie_01.mp4?alt=media&token=381bebdf-f683-4514-bdb3-00284d9d3d7f";
        setVideoUrl(videoUrl); // Directly set the URL to the state
      }, []);
    
      useEffect(() => {
        // console.log("Official videoUrl:", videoUrl);  // Check if videoUrl is set correctly
      }, [videoUrl]);
    
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
    
    
    
      const goToSignUp = () => {
    
        navigate('/signup');
    
      }
    
      useEffect(() => {
        const interval = setInterval(() => {
          if (videoRef.current && videoRef.current.currentTime >= 5) {
            setHideLogo(false);
          }
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
    
    
      return (
    
        <VStack>
    
    
    
          {showLearnMore ? (
            <>
    
             
    
              <VStack bgColor="black" p={6} spacing={6} align="start" mt="-1rem" mb="2rem">
    
    <Heading
      color="white"
      fontSize={["26px", "30px", "36px"]}
      maxWidth={["90%", "80%", "65%"]}
      fontWeight="550"
      mb="10px"
      mt="2rem"
    >
      What to Expect in Our Live Gentle Music Sessions
    </Heading>

    <Image
      src="/yogamusicmeditations.jpeg"
      alt="Logo"
      width="200px"
      maxH="200px"
      mb={4}
    />


    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}>
      I. Live Piano Music as a Lullaby for the Soul
    </Text>
    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
      Experience soothing piano music played with care, expression, and intention. Tunes and melodies are gently slowed down, softened, and shaped like lullabies — creating a peaceful atmosphere that feels like a personal sound bath, but with real music, not random tones.
    </Text>


    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}>
      II. Music infused with Meditation & Mindfulness
    </Text>
    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
      The music encourages deep breathing, calm awareness, and gentle observation. Each piece unfolds slowly — allowing space for stillness, reflection, and emotional depth.
    </Text>

    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}>
      III. Music designed for Deep Rest, Relaxation, and Reflection
    </Text>

    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
      Lie back with a mat or pillow, close your eyes, and let the music guide your awareness. You don’t need to do anything — just listen and feel. Our sessions meet you where you are.
    </Text>


    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}>
      IV. Music that's more Than Ambient Sound
    </Text>


    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
      This isn’t background noise — it’s real music just slowed down and performed live in a gentle, delicate way. From Mozart to reimagined pop songs, every note is played to move something inside you — gently, and with care. Gentle doesn’t always mean quiet. You’ll hear rich contrasts — bold, low tones alongside soft high whispers — all thoughtfully paced to keep you present, grounded, and emotionally attuned.
    </Text>



    <Button
      width="auto"
      variant="outline"
      color="white"
      borderColor="white"
      px={["1rem", "1.5rem", "2rem"]}
      py={["1.25rem", "1.5rem", "1.5rem"]}
      borderRadius="xl"
      fontWeight="bold"
      fontSize={["xs", "sm", "md"]}
      _hover={{
        bg: 'white',
        color: '#05c7d0',
        outline: 'none',
        borderColor: '#06e4ed',
      }}
      onClick={() => {
        setShowLearnMore(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      }}
    >
      Learn More
    </Button>




  </VStack>
    
            </>
          ) : (
    
            <>

            
<VStack bgColor="black" p={6} spacing={6} align="start" mt="-1rem" mb="2rem">
    
    <Heading
      color="white"
      fontSize="26px"
      maxWidth={["90%", "80%", "65%"]}
      fontWeight="550"
      mb="10px"
      mt="2rem"
    >
      Our Musical Philosophy for Gentle Music
    </Heading>

    <Image
      src="/learn_more_image3.jpg"
      alt="Logo"
      width="200px"
      maxH="200px"
      mb={4}
    />





    <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      Gentle Music is slowed down, stripped of urgency, yet full of feeling. Each note is placed with intention, each silence allowed to linger.
    </Text>

    <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      We don’t just play softly — we play gently. That means you may hear sudden swells, expressive dynamics, or deep low tones that stir emotion. But everything is anchored in slowness, awareness, and emotional intention — never rushed, never chaotic.
    </Text>

    <UnorderedList color="white" fontSize={["14px", "16px", "18px"]} pl={6} spacing={2}>
      <ListItem fontSize={["14px", "16px", "18px"]}>Bright major keys like D, F, and A fill the upper registers with light and spaciousness.</ListItem>
      <ListItem fontSize={["14px", "16px", "18px"]}>Darker tonalities like E-flat and G-flat major appear in the bass, grounding the experience with warmth.</ListItem>
      <ListItem fontSize={["14px", "16px", "18px"]}>Sometimes we contrast soft passages with unexpectedly loud phrases — not to startle, but to open the heart wider.</ListItem>
    </UnorderedList>

    <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      With slowed-down classical pieces and reimagined pop songs, PureMusic's in-person live sessions create gentle musical experiences designed to awaken your senses and bring you into full awareness of your mind, body, and soul.</Text>

    <Button
      width="auto"
      variant="outline"
      color="white"
      borderColor="white"
      px={["1rem", "1.5rem", "2rem"]}
      py={["1.25rem", "1.5rem", "1.5rem"]}
      borderRadius="xl"
      fontWeight="bold"
      fontSize={["xs", "sm", "md"]}
      _hover={{
        bg: 'white',
        color: '#05c7d0',
        outline: 'none',
        borderColor: '#06e4ed',
      }}
      onClick={goToGeneralEvents}
    >
      Join A Gentle Music Session
    </Button>
  </VStack>



            </>
          )
    
          }
    
    
          <VStack bgColor="white" p={6} spacing={6} align="start" mt="-1rem">
    
            <Heading
              fontSize={["26px", "30px", "36px"]}
              maxWidth={["90%", "80%", "65%"]}
              fontWeight="550"
              mb="10px"
              mt="2rem"
            >
              Why Join PureMusic's Live Gentle Music Sessions
            </Heading>
    
            <Image
              src="/learn_more_image1.jpg"
              alt="Logo"
              width="200px"
              maxH="200px"
              mb={4}
            />
    
    
            <UnorderedList>
              <ListItem>
                <Text as="span" fontWeight="bold">Take a pause from the Pace of Modern Life:</Text>{" "}
                PureMusic offers a gentle escape giving you a chance to slow down, breathe deeply, and simply be.
              </ListItem>
    
              <ListItem>
                <Text as="span" fontWeight="bold">Support for Your Nervous System:</Text>{" "}
                The slow tempo, gentle dynamics, and thoughtful contrast in our music help signal safety to your body making it especially supportive for those experiencing stress or anxiety.
              </ListItem>
    
              <ListItem>
                <Text as="span" fontWeight="bold">Find Community:</Text>{" "}
                You’re not alone here. Every session brings together people looking for calm, reflection, and real connection. It’s a quiet but meaningful way to feel part of something — to be held in sound, space, and shared intention.
              </ListItem>
    
              <ListItem>
                <Text as="span" fontWeight="bold">Listen to Real Music played Live:</Text>{" "}
                No ambient noises or background loops. You’ll hear is real music performed live by a musician who listens deeply, feels the energy of the room, and responds with intentional, emotionally expressive sound. Slowed down and shaped like a story, the music is meant to move and support you.
              </ListItem>
    
              <ListItem>
                <Text as="span" fontWeight="bold">Unwind and Connect with Your Inner Self:</Text>{" "}
                There’s no pressure to perform or achieve anything. You're welcome to lie down, close your eyes, and simply receive the music. Whether you're feeling peaceful, overwhelmed, tender, or tired — this is your space to feel, heal, and just be.
              </ListItem>
    
            </UnorderedList>
    
            <Button
              width="auto"
              variant="outline"
              bg="#06e4ed"
              color="white"
              borderColor="white"
              px={["1rem", "1.5rem", "2rem"]}
              py={["1.25rem", "1.5rem", "1.5rem"]}
              borderRadius="xl"
              fontWeight="bold"
              fontSize={["xs", "sm", "md"]}
              _hover={{
                bg: '#05c7d0', // Semi-transparent gray background
                color: 'white', // White text color
                borderColor: 'white', // White border color
              }}
    
              onClick={goToGeneralEvents}
            >
              Join A Gentle Music Session
            </Button>
    
          </VStack>
    
    
    
          <VStack bgColor="black" p={6} spacing={6} align="center" mt="-1rem" mb="2rem" width="100%">
    
            <Heading
              color="white"
              fontSize="26px"
              maxWidth={["90%", "80%", "65%"]}
              fontWeight="550"
              mb="10px"
              mt="2rem"
            >
              Meet our Artist
            </Heading>
    
            <Image
              src="/Artists1.jpg"
              alt="Logo"
              borderRadius="full"
              boxSize="80px"
    
            />
            <Text color="white" fontWeight="500" fontSize="16px">Nathanael Fra</Text>
    
    
    
    
            <Text color="white" fontSize={["14px", "14px", "14px"]} lineHeight="1.6" textAlign="center" mx="3rem">
              Our gentle music sessions are led by an experienced and compassionate musician who specialize in music performance. Listen to some of his video recorded performances
            </Text>
    
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
                        <p>Watch Now</p>
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
    
    
                          <Flex wrap="wrap" justify="center"
                            align="center" gap={2}>
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
    
    
    
    
          </VStack>
    
    
    
    
          <Button
            width="auto"
            variant="outline"
            bg="#06e4ed"
            color="white"
            borderColor="white"
            px={["1rem", "1.5rem", "2rem"]}
            py={["1.25rem", "1.5rem", "1.5rem"]}
            borderRadius="xl"
            fontWeight="bold"
            fontSize={["xs", "sm", "md"]}
            _hover={{
              bg: '#05c7d0', // Semi-transparent gray background
              color: 'white', // White text color
              borderColor: 'white', // White border color
            }}
            onClick={goToGeneralEvents}
          >
            Start Your Gentle Music Journey
          </Button>
    
    
          {!hideLogo && (
            <>
              <Image
                src="/PureMusicLogo.jpeg"
                borderRadius='full'
                width="50px"
                maxH="50px"
                className="profile-image-circle"
                alt='puremusic logo'
    
              />
    
              <Flex justify="center" mt={3} flexDirection="column" >
    
    
    
    
              </Flex>
            </>
    
          )}
    
        </VStack>
    
    
      )
    
    }
    

export default GentleMusicPage
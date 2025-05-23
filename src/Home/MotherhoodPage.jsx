import React, { useRef, useState, useEffect } from 'react';
    import { Button, Text, Flex, Image, VStack, Box, Heading, UnorderedList, ListItem, HStack } from '@chakra-ui/react';
    import { fetchVideoUrl } from '../Movies/videos';
    import { tipWaiter } from '../Utilities/stripe';
    import { useNavigate } from 'react-router-dom';
    import { useData } from '../App';
    const MotherhoodPage = () => {
    
      const [mainVideoUrl, setMainVideoUrl] = useState("/Piano_playing_motherhood.mp4");
    
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
    
    
      useEffect(() => {
        const videoUrl = "/SampleLullabyPiano.mp4";
        setVideoUrl(videoUrl); // Directly set the URL to the state
      }, []);
    
      useEffect(() => {
       // console.log("Official videoUrl:", videoUrl);  // Check if videoUrl is set correctly
      }, [videoUrl]);
    
  
    
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
    
    
    
    <Box
  position="relative"
  w="100vw"
  h={{ base: "60vh", sm: "80vh", md: "70vh" }}
  maxW="100%"
  margin="auto"
  mt="-1rem"
  overflow="hidden"
>
  {/* Video */}
  {mainVideoUrl ? (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
      }}
    >
      <source src={mainVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : null}

  {/* Dark overlay to improve contrast */}
  <Box
    position="absolute"
    top={0}
    left={0}
    w="100%"
    h="100%"
    bg="rgba(0, 0, 0, 0.5)" // You can adjust opacity here
    zIndex={0.5}
  />

  {/* Overlay Text */}
  <Flex
    direction="column"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    zIndex="1"
    align="center"
    textAlign="center"
    gap={2}
    px={4}
  >
    <Image
      src="/PureMusicWhiteLogo.png"
      alt="Logo"
      width="80px"
      maxH="80px"
      mb={4}
    />

    <Text
      fontWeight="bold"
      color="white"
      lineHeight="1.1"
      fontSize={["20px", "24px", "30px"]}
    >
      PureMusic for every stage of motherhood
    </Text>

    <Text
      fontWeight="500"
      color="white"
      lineHeight="1.1"
      fontSize={["14px", "16px", "20px"]}
    >
Supporting your baby’s development and your bond through live gentle music—from pregnancy to postpartum.

    </Text>

    <Flex gap={4} mt={4} wrap="wrap" justify="center">
      <Button
        width="auto"
        variant="outline"
        color="white"
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
      >
        Get 3 Days FREE On-Demand Live Gentle Music
      </Button>

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
      >
        Join A Gentle Music Session 
      </Button>
    </Flex>
  </Flex>
</Box>

    
    
       
      <VStack bgColor="black" p={6} spacing={6} align="start" mt="-1rem"  mb="2rem" width="100%">
    
    <Heading
      color="white"
      fontSize="26px"
      maxWidth={["90%", "80%", "65%"]}
      fontWeight="550"
      mb="10px"
      mt="2rem"
    >
The Science Behind Music and Child Development
    </Heading>
    
    <Image
              src="/Baby_Mom_Music.jpg"
              alt="Logo"
              width="400px"
              maxH="400px"
              mb={4}
            />
    
    
    
    
    
    <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
    From the womb through your baby’s first year, gentle music plays a powerful role in development, connection, and calm.
      </Text>
    
      <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      Prenatal (from 18 weeks)     
       </Text>
    
      <UnorderedList color="white" fontSize={["14px", "16px", "18px"]} pl={6} spacing={2}>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Around 18–20 weeks, babies begin hearing sounds — the mother’s heartbeat, voice, and yes, music.</ListItem>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Gentle music can promote prenatal bonding, lower maternal stress hormones, and support early neural connections.</ListItem>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Slow, rhythmic melodies echo the womb’s safe, steady environment — bringing comfort to both baby and mother.</ListItem>
      </UnorderedList>
    
   

      <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      Postnatal (0–12 months) 
       </Text>
    
      <UnorderedList color="white" fontSize={["14px", "16px", "18px"]} pl={6} spacing={2}>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Music exposure strengthens auditory pathways, supports language development, and improves emotional regulation.</ListItem>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Live music, especially when emotionally attuned, helps babies develop secure attachment by syncing with caregivers’ emotions.</ListItem>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Repetition of calming sounds creates a sense of safety and predictability — essential for early brain development.</ListItem>
      </UnorderedList>

      <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      Research shows that babies not only hear music — they feel it. Especially when it’s live, slow, and emotionally expressive.
           </Text>
     
    </VStack>
   
    
    <VStack bgColor="black" p={6} spacing={6} align="start" mt="-1rem"  mb="2rem">
    
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
      We don’t just play softly — we play gently. That means you may hear sudden swells, expressive dynamics, or deep low tones that stir emotion. But everything is anchored in slowness, awareness, and emotional intention — thoughtfully crafted to nurture the special bond between mother and child during this sensitive time.
      </Text>

      <UnorderedList color="white" fontSize={["14px", "16px", "18px"]} pl={6} spacing={2}>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Bright major keys like D, F, and A fill the upper registers with light and spaciousness.</ListItem>
        <ListItem  fontSize={["14px", "16px", "18px"]}>Darker tonalities like E-flat and G-flat major appear in the bass, grounding the experience with warmth.</ListItem>
      </UnorderedList>

      <Text color="white" fontSize={["16px", "18px", "20px"]} lineHeight="1.6">
      With slowed-down classical pieces and lullabies, PureMusic's in-person live sessions create gentle musical experiences designed to awaken your senses and support the unique emotional and developmental needs of moms and babies during pregnancy and early motherhood.
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
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
        }}
      >
    Start Your Gentle Music Journey
      </Button>
    </VStack>
    
    
    
   
    
      <>
        <VStack bgColor="black" p={6} spacing={6} align="start" mt="-1rem" mb="2rem" width="100%">
    
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
              src="/baby_music_bright.jpg"
              alt="Logo"
              width="200px"
              maxH="200px"
              mb={4}
            />
               <Text color="white" fontWeight="italic" maxWidth={["90%", "80%", "65%"]}> 
    Ideal for moms from pregnancy through baby’s first year, our sessions gently support your bond and wellbeing.
    </Text>

    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}> 
    I. Live Piano Music as a Lullaby
    </Text>
    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
    Experience soothing piano music played with care and intention—softened and slowed like a lullaby to comfort you and your baby.
    </Text>
    
    
    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}> 
    II. Music infused with Meditation & Mindfulness
    </Text>
    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
    Encourages calm breathing and gentle awareness, helping both you and your little one relax and connect deeply.
    </Text>
    
    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}> 
    III. Deep Rest, Relaxation & Bonding
    </Text>
    
    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
    Whether you’re pregnant or cuddling your baby, these sessions meet you where you are—supporting your body, mind, and heart.
    </Text>
    
    
    <Text color="white" fontWeight="bold" maxWidth={["90%", "80%", "65%"]}> 
    IV. Real Music That Moves You
    </Text>
    
    
    <Text color="white" maxWidth={["90%", "80%", "65%"]}>
    This isn’t just background noise. Live music is thoughtfully performed to soothe, engage, and nurture the unique emotional landscape of motherhood.
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
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
        }}
      >
  Start Your Gentle Music Journey
      </Button>
    
    </VStack>
      </>
   
        
    
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
      <Text as="span" fontWeight="bold">Pause and Breathe During Pregnancy and Beyond:</Text>{" "}
      Take a gentle break from life’s pace to nurture yourself and your baby.
      </ListItem>
    
      <ListItem>
      <Text as="span" fontWeight="bold">Support Your Nervous System and Baby’s Development:</Text>{" "}
      Our slow tempos and expressive dynamics signal safety to your body and help support early brain and emotional growth for your baby.
      </ListItem>
    
      <ListItem>
      <Text as="span" fontWeight="bold">Find Community:</Text>{" "}
      Join a community of moms experiencing the unique joys and challenges of pregnancy and new motherhood.
      </ListItem>
    
      <ListItem>
      <Text as="span" fontWeight="bold">Experience Live Music Made for Moms and Babies:</Text>{" "}
      Every note is performed with awareness of your journey, helping soothe stress and deepen your bond.
      </ListItem>
    
      <ListItem>
      <Text as="span" fontWeight="bold">Relax, Heal, and Connect: </Text>{" "}
      No pressure, no expectations—just a safe space to feel and receive music designed to nurture you and your child.
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
    
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
        }}
      >
        Join A Gentle Music Session
      </Button>
    
    </VStack>
    
    
    
    <VStack bgColor="black" p={6} spacing={6} align="center" mt="-1rem"  mb="2rem" width="100%">
    
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
    Hi, I’m Nathanael.
I’m a pianist with over 20 years of music performance experience, specializing in gentle, expressive music. I’ll be leading the PureMusic gentle music sessions, where I slow down classical pieces into calming lullabies designed to help you relax, support your baby’s early development, and strengthen your bond through music.
I can’t wait to share this special experience with you in the next gentle music session.
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
              {!isPlaying && (
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
                    <p>See Preview</p>
                  </div>
    
                </>
              )}
    
              {/* Show Thumbnail Image when the video is paused */}
              {!isPlaying  && (
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
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
        }}
      >
    Start Your Gentle Music Journey
      </Button>
    
    
        {!hideLogo  && (
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

export default MotherhoodPage
package me.springcorsbloomfilter.service;

import com.google.common.hash.BloomFilter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UrlServiceTest {

    @Mock
    private BloomFilter<String> bloomFilter;

    @InjectMocks
    private UrlService urlService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Should add URL to bloom filter")
    void shouldAddUrlToBloomFilter() {
        String url = "http://example.com";
        urlService.addWhiteUrl(url);
        verify(bloomFilter, times(1)).put(url);
    }

    @Test
    @DisplayName("Should return true when URL exists in bloom filter")
    void shouldReturnTrueWhenUrlExistsInBloomFilter() {
        String url = "http://example.com";
        when(bloomFilter.mightContain(url)).thenReturn(true);
        assertTrue(urlService.existUrl(url));
    }

    @Test
    @DisplayName("Should return false when URL does not exist in bloom filter")
    void shouldReturnFalseWhenUrlDoesNotExistInBloomFilter() {
        String url = "http://example.com";
        when(bloomFilter.mightContain(url)).thenReturn(false);
        assertFalse(urlService.existUrl(url));
    }
}